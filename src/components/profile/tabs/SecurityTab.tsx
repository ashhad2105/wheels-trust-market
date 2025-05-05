
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import ProfileCard from "../ProfileCard";

const SecurityTab = () => {
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate password change API call
    setTimeout(() => {
      setLoading(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };
  
  return (
    <ProfileCard
      title="Security Settings"
      description="Manage your password and account security"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full"
              />
            </div>
            
            <Button type="submit" disabled={loading || !currentPassword || !newPassword || newPassword !== confirmPassword}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : "Update Password"}
            </Button>
          </form>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium mb-4">Account Security</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Last login: May 5, 2025, 10:30 AM
            </p>
            <p className="text-sm text-gray-600">
              IP Address: 192.168.1.XX
            </p>
          </div>
        </div>
      </div>
    </ProfileCard>
  );
};

export default SecurityTab;
