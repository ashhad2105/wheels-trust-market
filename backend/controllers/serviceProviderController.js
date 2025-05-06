const ServiceProvider = require('../models/ServiceProvider');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all service providers
// @route   GET /api/v1/service-providers
// @access  Public
exports.getServiceProviders = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    let query = ServiceProvider.find(JSON.parse(queryStr)).populate('services');

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-rating');
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await ServiceProvider.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);
    const serviceProviders = await query;

    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      data: {
        serviceProviders,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          limit
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

const getServiceProviderIdByUserId = async (userId) => {
  const serviceProvider = await ServiceProvider.findOne({ user: userId }).select('_id');
  if (!serviceProvider) {
    throw new Error('Service provider not found for this user.');
  }
  return serviceProvider._id;
};

exports.getServiceProvider = async (req, res, next) => {
  try {
    const serviceProvider = await ServiceProvider.findById(req.params.id).populate('services');
    if (!serviceProvider) {
      return next(new ErrorResponse(`Service provider not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
      success: true,
      data: serviceProvider
    });
  } catch (err) {
    next(err);
  }
};

exports.createServiceProvider = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const serviceProvider = await ServiceProvider.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Service provider created successfully',
      data: serviceProvider
    });
  } catch (err) {
    next(err);
  }
};

exports.updateServiceProvider = async (req, res, next) => {
  try {
    let serviceProvider = await ServiceProvider.findById(req.params.id);
    if (!serviceProvider) {
      return next(new ErrorResponse(`Service provider not found with id of ${req.params.id}`, 404));
    }
    if (serviceProvider.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this service provider`, 403));
    }
    serviceProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      success: true,
      message: 'Service provider updated successfully',
      data: serviceProvider
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteServiceProvider = async (req, res, next) => {
  try {
    const serviceProvider = await ServiceProvider.findById(req.params.id);
    if (!serviceProvider) {
      return next(new ErrorResponse(`Service provider not found with id of ${req.params.id}`, 404));
    }
    if (serviceProvider.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this service provider`, 403));
    }
    await serviceProvider.remove();
    res.status(200).json({
      success: true,
      message: 'Service provider deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.updateServiceProviderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return next(new ErrorResponse('Invalid status value', 400));
    }
    let serviceProvider = await ServiceProvider.findById(req.params.id);
    if (!serviceProvider) {
      return next(new ErrorResponse(`Service provider not found with id of ${req.params.id}`, 404));
    }
    if (serviceProvider.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this service provider`, 403));
    }
    serviceProvider = await ServiceProvider.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: 'Service provider status updated successfully',
      data: {
        id: serviceProvider._id,
        name: serviceProvider.name,
        status: serviceProvider.status,
        updatedAt: serviceProvider.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateServiceProviderVerification = async (req, res, next) => {
  try {
    const { isVerified } = req.body;
    if (typeof isVerified !== 'boolean') {
      return next(new ErrorResponse('Invalid verification status', 400));
    }
    let serviceProvider = await ServiceProvider.findById(req.params.id);
    if (!serviceProvider) {
      return next(new ErrorResponse(`Service provider not found with id of ${req.params.id}`, 404));
    }
    if (req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to verify service providers`, 403));
    }
    serviceProvider = await ServiceProvider.findByIdAndUpdate(
      req.params.id,
      { isVerified, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: 'Service provider verification status updated successfully',
      data: {
        id: serviceProvider._id,
        name: serviceProvider.name,
        isVerified: serviceProvider.isVerified,
        updatedAt: serviceProvider.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};
