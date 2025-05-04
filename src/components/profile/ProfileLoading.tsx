
import React from "react";
import { Loader2 } from "lucide-react";

const ProfileLoading = () => {
  return (
    <div className="container mx-auto px-4 flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg">Loading your profile...</p>
      </div>
    </div>
  );
};

export default ProfileLoading;
