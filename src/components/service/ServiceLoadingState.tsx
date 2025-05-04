
import React from "react";
import { Loader2 } from "lucide-react";

const ServiceLoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading services...</p>
      </div>
    </div>
  );
};

export default ServiceLoadingState;
