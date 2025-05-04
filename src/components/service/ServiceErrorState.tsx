
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ServiceErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ServiceErrorState: React.FC<ServiceErrorStateProps> = ({ error, onRetry }) => {
  const { toast } = useToast();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry();
      toast({
        title: "Retrying connection",
        description: "Attempting to reconnect to the backend service...",
      });
    } catch (err) {
      // Error handling is done in the parent component
    } finally {
      setIsRetrying(false);
    }
  };

  const openEnvSettings = () => {
    toast({
      title: "Backend URL Info",
      description: `Make sure your .env file has VITE_API_URL set correctly.`,
    });
  };

  return (
    <div className="text-center py-10 px-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-4 flex justify-center">
        <AlertTriangle className="h-12 w-12 text-amber-500" />
      </div>
      <h3 className="text-lg font-medium mb-2 text-destructive">{error}</h3>
      <div className="text-gray-600 mb-6 space-y-2">
        <p>There was an error connecting to the backend service.</p>
        <p className="text-sm bg-gray-100 p-3 rounded-md inline-block">
          Make sure the backend server is running at <code className="bg-gray-200 p-1 rounded font-mono">{import.meta.env.VITE_API_URL || 'http://localhost:5000'}</code>
        </p>
        <div className="text-sm mt-2 text-gray-500">
          <p>Possible solutions:</p>
          <ul className="list-disc text-left mx-auto max-w-md mt-2">
            <li>Check if your backend server is running</li>
            <li>Verify network connection and firewall settings</li>
            <li>Ensure API URL is correctly set in environment variables</li>
            <li>Check for CORS issues in your browser console</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={handleRetry}
          className="bg-primary text-white"
          disabled={isRetrying}
        >
          {isRetrying ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Retrying...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Connection
            </>
          )}
        </Button>
        <Button 
          variant="outline" 
          onClick={openEnvSettings}
        >
          <Settings className="mr-2 h-4 w-4" />
          Check API Settings
        </Button>
      </div>
    </div>
  );
};

export default ServiceErrorState;
