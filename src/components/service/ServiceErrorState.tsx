
import React from "react";

interface ServiceErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ServiceErrorState: React.FC<ServiceErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-2 text-destructive">{error}</h3>
      <p className="text-gray-600 mb-4">
        There was an error connecting to the backend service.
        <br />
        Make sure the backend server is running at <code className="bg-gray-100 p-1 rounded">http://localhost:5000</code>
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Retry Connection
      </button>
    </div>
  );
};

export default ServiceErrorState;
