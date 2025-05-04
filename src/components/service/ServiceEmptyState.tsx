
import React from "react";

const ServiceEmptyState: React.FC = () => {
  return (
    <div className="text-center py-10 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium mb-2">No services found</h3>
      <p className="text-gray-600">
        Try adjusting your search criteria or filters
      </p>
    </div>
  );
};

export default ServiceEmptyState;
