const Notification = require('../models/Notification');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all notifications for a user
// @route   GET /api/v1/notifications
// @access  Private
exports.getNotifications = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    let query = Notification.find({
      ...JSON.parse(queryStr),
      user: req.user.id
    });

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Notification.countDocuments({
      ...JSON.parse(queryStr),
      user: req.user.id
    });

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const notifications = await query;

    // Pagination result
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
        notifications,
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

// @desc    Get single notification
// @route   GET /api/v1/notifications/:id
// @access  Private
exports.getNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return next(
        new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is notification owner
    if (notification.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to view this notification`,
          403
        )
      );
    }

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new notification
// @route   POST /api/v1/notifications
// @access  Private
exports.createNotification = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const notification = await Notification.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update notification
// @route   PUT /api/v1/notifications/:id
// @access  Private
exports.updateNotification = async (req, res, next) => {
  try {
    let notification = await Notification.findById(req.params.id);

    if (!notification) {
      return next(
        new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is notification owner
    if (notification.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this notification`,
          403
        )
      );
    }

    notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Notification updated successfully',
      data: notification
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete notification
// @route   DELETE /api/v1/notifications/:id
// @access  Private
exports.deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return next(
        new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is notification owner
    if (notification.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this notification`,
          403
        )
      );
    }

    await notification.remove();

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark notification as read
// @route   PATCH /api/v1/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    let notification = await Notification.findById(req.params.id);

    if (!notification) {
      return next(
        new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is notification owner
    if (notification.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this notification`,
          403
        )
      );
    }

    notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true, readAt: Date.now() },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: {
        id: notification._id,
        isRead: notification.isRead,
        readAt: notification.readAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark all notifications as read
// @route   PATCH /api/v1/notifications/read-all
// @access  Private
exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true, readAt: Date.now() }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (err) {
    next(err);
  }
}; 