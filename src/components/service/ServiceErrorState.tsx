
import React from "react";

interface ServiceErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ServiceErrorState: React.FC<ServiceErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="text-center py-10 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium mb-2 text-destructive">{error}</h3>
      <p className="text-gray-600 mb-4">Please try again later</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Retry
      </button>
    </div>
  );
};

export default ServiceErrorState;
