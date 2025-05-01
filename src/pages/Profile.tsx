
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, Car, Bell, Lock, Key } from "lucide-react";
import { cars } from "@/lib/data";
import CarCard from "@/components/car/CarCard";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Profile = () => {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });
  
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  const onProfileSubmit = (values: z.infer<typeof profileSchema>) => {
    updateUser(values);
    setIsEditing(false);
    // Show success message
    alert("Profile updated successfully!");
  };
  
  const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    // In a real app, this would call an API to update the password
    console.log("Password update values:", values);
    // Reset form
    passwordForm.reset();
    // Show success message
    alert("Password updated successfully!");
  };
  
  // Mock user's car listings and saved cars
  const userListings = cars.slice(0, 2);
  const savedCars = cars.slice(3, 5);
  
  if (!isAuthenticated || !user) {
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
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                <img 
                  src={user.avatar || "https://via.placeholder.com/100?text=User"} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-600">
                  Member since {user.joinedDate || "2023"}
                </p>
                <div className="flex items-center mt-1">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                    {user.role === "admin" ? "Admin" : 
                     user.role === "service_provider" ? "Service Provider" : 
                     "User"}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => logout()}
                className="md:ml-auto"
              >
                Sign Out
              </Button>
            </div>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-8 w-full justify-start border-b overflow-x-auto flex-nowrap">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="listings" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  <span>My Listings</span>
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                    </svg>
                    <span>Saved Cars</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    {!isEditing && (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex gap-2">
                          <Button type="submit">Save Changes</Button>
                          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Full Name</div>
                          <div>{user.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div>{user.email}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Phone Number</div>
                          <div>{user.phone || 'Not provided'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Member Since</div>
                          <div>{user.joinedDate || 'January 2023'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="listings">
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">My Car Listings</h2>
                    <Button>
                      <Car className="h-4 w-4 mr-2" />
                      Add New Listing
                    </Button>
                  </div>
                  
                  {userListings.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userListings.map(car => (
                        <div key={car.id} className="relative">
                          <CarCard car={car} />
                          <div className="absolute top-3 left-3 z-10 flex gap-2">
                            <Button size="sm" variant="outline" className="bg-white">Edit</Button>
                            <Button size="sm" variant="outline" className="bg-white text-red-600 hover:text-red-700">Delete</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <Car className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium mb-2">No listings yet</h3>
                      <p className="text-gray-600 mb-4">
                        You haven't listed any cars for sale yet.
                      </p>
                      <Button>Create Your First Listing</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="saved">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Saved Cars</h2>
                  
                  {savedCars.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedCars.map(car => (
                        <CarCard key={car.id} car={car} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <svg className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                      </svg>
                      <h3 className="font-medium mb-2">No saved cars</h3>
                      <p className="text-gray-600 mb-4">
                        You haven't saved any cars yet. Save cars to compare later.
                      </p>
                      <Button variant="outline">Browse Cars</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="notifications">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  
                  <div className="bg-white rounded-lg shadow divide-y">
                    <div className="p-4 flex gap-4 items-start">
                      <div className="bg-blue-100 rounded-full p-2">
                        <Bell className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium">New message from seller</h4>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          John responded to your inquiry about the 2018 Honda Civic.
                        </p>
                        <Button size="sm" variant="outline">View Message</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 flex gap-4 items-start">
                      <div className="bg-green-100 rounded-full p-2">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium">Price drop alert</h4>
                          <span className="text-xs text-gray-500">Yesterday</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          A car on your watchlist has dropped in price by $1,200.
                        </p>
                        <Button size="sm" variant="outline">View Car</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security">
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                    
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                                  <Input 
                                    type="password" 
                                    className="pl-10"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                                  <Input 
                                    type="password" 
                                    className="pl-10"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                                  <Input 
                                    type="password" 
                                    className="pl-10"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit">Update Password</Button>
                      </form>
                    </Form>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Login History</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-gray-500">Chrome on Windows • New York, USA</div>
                        </div>
                        <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          Active Now
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Previous Login</div>
                          <div className="text-sm text-gray-500">Safari on iPhone • New York, USA</div>
                        </div>
                        <div className="text-xs text-gray-500">
                          2 days ago
                        </div>
                      </div>
                    </div>
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
