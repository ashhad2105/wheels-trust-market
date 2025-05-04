
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import ProfileCard from "../ProfileCard";

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  offers: boolean;
}

const NotificationsTab = () => {
  const [loading, setLoading] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    push: false,
    sms: true,
    offers: false,
  });

  const handleSavePreferences = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <ProfileCard
      title="Notification Preferences"
      description="Control what notifications you receive and how you receive them."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive important updates via email</p>
            </div>
            <Switch 
              checked={notificationSettings.email}
              onCheckedChange={(checked) => setNotificationSettings({
                ...notificationSettings,
                email: checked
              })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-sm text-gray-500">Receive notifications on your device</p>
            </div>
            <Switch 
              checked={notificationSettings.push}
              onCheckedChange={(checked) => setNotificationSettings({
                ...notificationSettings,
                push: checked
              })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-gray-500">Receive text messages for urgent updates</p>
            </div>
            <Switch 
              checked={notificationSettings.sms}
              onCheckedChange={(checked) => setNotificationSettings({
                ...notificationSettings,
                sms: checked
              })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Marketing & Offers</h4>
              <p className="text-sm text-gray-500">Receive promotional content and special offers</p>
            </div>
            <Switch 
              checked={notificationSettings.offers}
              onCheckedChange={(checked) => setNotificationSettings({
                ...notificationSettings,
                offers: checked
              })}
            />
          </div>
        </div>
        
        <div className="pt-2">
          <Button onClick={handleSavePreferences} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : "Save Preferences"}
          </Button>
        </div>
      </div>
    </ProfileCard>
  );
};

export default NotificationsTab;
