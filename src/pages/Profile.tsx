
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { 
  User, 
  Car, 
  Shield, 
  Bell
} from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileLoading from "@/components/profile/ProfileLoading";
import GeneralTab from "@/components/profile/tabs/GeneralTab";
import CarsTab from "@/components/profile/tabs/CarsTab";
import SecurityTab from "@/components/profile/tabs/SecurityTab";
import NotificationsTab from "@/components/profile/tabs/NotificationsTab";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  avatar?: string;
  role: string;
}

const Profile = () => {
  const { isAuthenticated, user, token } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileLoading, setProfileLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [fetchAttempted, setFetchAttempted] = useState(false);
  
  // Fetch user profile from the backend
  const fetchUserProfile = async () => {
    if (!token || !user?.id) {
      // Create a placeholder profile if no user data is available
      setUserProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        address: {},
        role: user?.role || "user"
      });
      setProfileLoading(false);
      setFetchAttempted(true);
      return;
    }
    
    try {
      setProfileLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      const userData = response.data.data;
      setUserProfile(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // If the API fails, create a placeholder profile from the auth context
      setUserProfile({
        name: user.name || "",
        email: user.email || "",
        phone: "",
        address: {},
        role: user.role || "user"
      });
      
      toast({
        title: "Couldn't fetch profile details",
        description: "Using information from your session instead.",
        variant: "destructive"
      });
    } finally {
      setProfileLoading(false);
      setFetchAttempted(true);
    }
  };
  
  // Effect to fetch user profile on component mount if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile();
    } else if (!isAuthenticated) {
      setProfileLoading(false);
      setFetchAttempted(true);
    }
  }, [isAuthenticated, user]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated && fetchAttempted) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, fetchAttempted]);
  
  if (!isAuthenticated && !userProfile) {
    return null; // Will be redirected
  }

  // Loading state while profile is being fetched
  if (profileLoading) {
    return (
      <>
        <Helmet>
          <title>My Profile | WheelsTrust</title>
        </Helmet>
        
        <Navbar />
        
        <main className="pt-24 pb-16 min-h-screen">
          <ProfileLoading />
        </main>
        
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Profile | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ProfileHeader avatar={userProfile?.avatar} />
            
            <Tabs defaultValue="general">
              <TabsList className="mb-8">
                <TabsTrigger value="general">
                  <User className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger value="cars">
                  <Car className="h-4 w-4 mr-2" />
                  My Cars
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <GeneralTab userProfile={userProfile} fetchUserProfile={fetchUserProfile} />
              </TabsContent>
              
              <TabsContent value="cars">
                <CarsTab />
              </TabsContent>
              
              <TabsContent value="security">
                <SecurityTab />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Profile;
