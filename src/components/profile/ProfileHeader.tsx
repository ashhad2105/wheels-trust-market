
import React from "react";

interface ProfileHeaderProps {
  avatar?: string;
}

const ProfileHeader = ({ avatar }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center mb-8">
      <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 overflow-hidden">
        <img 
          src={avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop"}
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-gray-600">
          Manage your account, listings, and preferences
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
