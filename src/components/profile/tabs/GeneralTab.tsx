
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, Eye, Bookmark, CreditCard, Clock } from "lucide-react";
import ProfileCard from "../ProfileCard";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

interface UserActivity {
  id: string;
  type: 'view' | 'message' | 'saved' | 'purchase';
  title: string;
  date: Date;
  image?: string;
}

interface GeneralTabProps {
  userProfile: any;
  fetchUserProfile: () => Promise<void>;
}

const GeneralTab = ({ userProfile, fetchUserProfile }: GeneralTabProps) => {
  const { toast } = useToast();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: userProfile?.name ? userProfile.name.split(" ")[0] : "",
    lastName: userProfile?.name ? (userProfile.name.split(" ").length > 1 ? userProfile.name.split(" ").slice(1).join(" ") : "") : "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    address: userProfile?.address 
      ? `${userProfile.address.street || ""}
${userProfile.address.city || ""}, ${userProfile.address.state || ""} ${userProfile.address.zipCode || ""}`.trim()
      : ""
  });

  // Mock user activity (would be replaced with real API data)
  const [userActivity] = useState<UserActivity[]>([
    {
      id: "1",
      type: "view",
      title: "2018 Toyota Camry",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=120&h=80",
    },
    {
      id: "2",
      type: "saved",
      title: "2020 Honda Accord",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=120&h=80",
    },
    {
      id: "3",
      type: "message",
      title: "Contacted Auto Spa Services",
      date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    },
  ]);

  // Handle input change for profile form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveProfile = async () => {
    if (!user?.id || !token) return;
    
    setLoading(true);
    
    try {
      // Format the data for the API
      const updatedProfile = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        address: {}
      };
      
      // Parse address from textarea if provided
      if (formData.address) {
        const addressLines = formData.address.split('\n');
        const streetAddress = addressLines[0] || '';
        
        let cityStateZip = '';
        if (addressLines.length > 1) {
          cityStateZip = addressLines[1] || '';
        }
        
        // Try to parse city, state, zip
        const cityStateZipMatch = cityStateZip.match(/([^,]+),\s*([A-Z]{2})\s*(\d{5}(?:-\d{4})?)?/);
        
        updatedProfile.address = {
          street: streetAddress,
          city: cityStateZipMatch?.[1] || '',
          state: cityStateZipMatch?.[2] || '',
          zipCode: cityStateZipMatch?.[3] || ''
        };
      }
      
      await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/users/${user.id}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated."
      });
      
      // Refresh user profile
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProfileCard 
        title="Personal Information" 
        description="Update your personal details and contact information."
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address" 
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street Address&#10;City, State ZIP"
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </ProfileCard>
      
      <ProfileCard
        title="Profile Photo"
        description="Upload a new profile photo."
      >
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img 
              src={userProfile?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop"}
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-2">
            <Button variant="outline">Upload New Photo</Button>
            <p className="text-xs text-gray-500">
              JPG, GIF or PNG. Max size 800K.
            </p>
          </div>
        </div>
      </ProfileCard>
      
      <ProfileCard
        title="Recent Activity"
        description="Your recent interactions on WheelsTrust."
      >
        <div className="space-y-4">
          {userActivity.map(activity => (
            <div key={activity.id} className="flex items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              {activity.image && (
                <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                </div>
              )}
              {!activity.image && (
                <div className="w-12 h-12 rounded bg-gray-100 mr-3 flex items-center justify-center flex-shrink-0">
                  {activity.type === 'message' && <Mail className="h-6 w-6 text-gray-400" />}
                  {activity.type === 'view' && <Eye className="h-6 w-6 text-gray-400" />}
                  {activity.type === 'saved' && <Bookmark className="h-6 w-6 text-gray-400" />}
                  {activity.type === 'purchase' && <CreditCard className="h-6 w-6 text-gray-400" />}
                </div>
              )}
              <div className="flex-grow">
                <div className="font-medium">{activity.title}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {userActivity.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No recent activity to show.</p>
            </div>
          )}
        </div>
      </ProfileCard>
    </div>
  );
};

export default GeneralTab;
