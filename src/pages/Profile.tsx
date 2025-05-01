
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Car, Shield, Bell } from "lucide-react";

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Will be redirected
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
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop" 
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
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-medium mb-4">Account Information</h2>
                  <p className="text-gray-600 mb-6">
                    Update your personal information and preferences.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Profile form will go here */}
                    <p>Profile settings coming soon</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="cars">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-medium mb-4">My Cars</h2>
                  <p className="text-gray-600 mb-6">
                    View and manage your car listings and purchases.
                  </p>
                  
                  {/* Car listings will go here */}
                  <div className="text-center py-8">
                    <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Cars Yet</h3>
                    <p className="text-gray-500 mb-4">You haven't bought or listed any cars yet.</p>
                    <Button>Browse Cars</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-medium mb-4">Security Settings</h2>
                  <p className="text-gray-600 mb-6">
                    Manage your password and security preferences.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Security settings will go here */}
                    <p>Security settings coming soon</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-medium mb-4">Notification Preferences</h2>
                  <p className="text-gray-600 mb-6">
                    Control what notifications you receive and how you receive them.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Notification settings will go here */}
                    <p>Notification settings coming soon</p>
                  </div>
                </div>
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
