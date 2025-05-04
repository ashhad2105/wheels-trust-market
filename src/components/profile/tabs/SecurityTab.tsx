
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Lock, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProfileCard from "../ProfileCard";
import axios from "axios";

interface UserSettings {
  privacy: {
    showProfile: boolean;
    showActivity: boolean;
    allowMessaging: boolean;
  };
}

const SecurityTab = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // User settings state
  const [userSettings, setUserSettings] = useState<UserSettings>({
    privacy: {
      showProfile: true,
      showActivity: false,
      allowMessaging: true,
    }
  });

  // Handle input change for password form
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    
    // This would be implemented with a real API endpoint
    // For now, we'll simulate an API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings updated",
        description: "Your account settings have been successfully updated."
      });
    }, 1000);
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // This would connect to a real password update endpoint
      // For demo purposes, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed."
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your password.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id || !token) return;
    
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted."
      });
      
      // Log the user out and redirect to home page
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Delete failed",
        description: "There was a problem deleting your account.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProfileCard
        title="Change Password"
        description="Update your account password."
      >
        <form onSubmit={(e) => { e.preventDefault(); handleUpdatePassword(); }}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type="password" 
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input 
                  id="newPassword" 
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
                <Key className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input 
                  id="confirmPassword" 
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                <Key className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : "Update Password"}
              </Button>
            </div>
          </div>
        </form>
      </ProfileCard>
      
      <ProfileCard
        title="Privacy Settings"
        description="Control your privacy preferences."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Public Profile</h4>
              <p className="text-sm text-gray-500">Allow others to see your profile</p>
            </div>
            <Switch 
              checked={userSettings.privacy.showProfile}
              onCheckedChange={(checked) => setUserSettings({
                ...userSettings,
                privacy: { ...userSettings.privacy, showProfile: checked }
              })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Activity Visibility</h4>
              <p className="text-sm text-gray-500">Show your activity to other users</p>
            </div>
            <Switch 
              checked={userSettings.privacy.showActivity}
              onCheckedChange={(checked) => setUserSettings({
                ...userSettings,
                privacy: { ...userSettings.privacy, showActivity: checked }
              })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Direct Messages</h4>
              <p className="text-sm text-gray-500">Allow other users to send you messages</p>
            </div>
            <Switch 
              checked={userSettings.privacy.allowMessaging}
              onCheckedChange={(checked) => setUserSettings({
                ...userSettings,
                privacy: { ...userSettings.privacy, allowMessaging: checked }
              })}
            />
          </div>
          
          <div className="pt-2">
            <Button onClick={handleSaveSettings} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : "Save Settings"}
            </Button>
          </div>
        </div>
      </ProfileCard>
      
      <ProfileCard
        title="Danger Zone"
        description="Irreversible account actions."
      >
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-md p-4">
            <h4 className="font-medium mb-1">Delete Account</h4>
            <p className="text-sm text-gray-500 mb-3">
              Permanently delete your account and all your data. This action cannot be undone.
            </p>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : "Delete My Account"}
            </Button>
          </div>
        </div>
      </ProfileCard>
    </div>
  );
};

export default SecurityTab;
