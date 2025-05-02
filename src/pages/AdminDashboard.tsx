
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link, Routes, Route } from "react-router-dom";
import { 
  Car, 
  Users, 
  Settings, 
  User, 
  LogOut, 
  Home, 
  Menu,
  Search,
  Bell,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cars, services, serviceProviders } from "@/lib/data";
import CarListingManagement from "@/components/car/CarListingManagement";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AdminNotifications from "@/components/admin/AdminNotifications";

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"dashboard" | "users" | "listings" | "providers" | "settings" | "notifications">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserStatusChange = (userId: string, newStatus: string) => {
    toast({
      title: "User Status Updated",
      description: `User status has been changed to ${newStatus}`
    });
  };

  const handleProviderStatusChange = (providerId: string, newStatus: string) => {
    toast({
      title: "Provider Status Updated",
      description: `Provider status has been changed to ${newStatus}`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16 bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <div 
            className={`fixed top-16 left-0 bottom-0 z-30 transition-all duration-300 ${
              sidebarOpen ? "w-64" : "w-0"
            } bg-white shadow-lg overflow-hidden`}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "users"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  Users
                </button>
                <button
                  onClick={() => setActiveTab("listings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "listings"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Car className="h-5 w-5" />
                  Car Listings
                </button>
                <button
                  onClick={() => setActiveTab("providers")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "providers"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  Service Providers
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "notifications"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  Notifications
                  <Badge className="ml-auto bg-red-500 text-white">3</Badge>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div 
            className={`transition-all duration-300 ${
              sidebarOpen ? "ml-64" : "ml-0"
            } flex-1`}
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <button 
                  onClick={toggleSidebar}
                  className="mr-4 p-2 rounded-lg hover:bg-gray-200"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <h1 className="text-2xl font-bold">
                  {activeTab === "dashboard" && "Admin Dashboard"}
                  {activeTab === "users" && "User Management"}
                  {activeTab === "listings" && "Car Listings"}
                  {activeTab === "providers" && "Service Providers"}
                  {activeTab === "settings" && "Settings"}
                  {activeTab === "notifications" && "Notifications"}
                </h1>
              </div>

              {/* Dashboard Content */}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-sm">Total Users</p>
                          <p className="text-2xl font-bold">137</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-green-600">
                        <span className="font-medium">↑ 12%</span> since last month
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-sm">Active Listings</p>
                          <p className="text-2xl font-bold">{cars.length}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <Car className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-green-600">
                        <span className="font-medium">↑ 5%</span> since last week
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-sm">Service Providers</p>
                          <p className="text-2xl font-bold">{serviceProviders.length}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                          <Settings className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-green-600">
                        <span className="font-medium">↑ 8%</span> since last month
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-sm">Total Revenue</p>
                          <p className="text-2xl font-bold">$24,530</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center">
                          <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-green-600">
                        <span className="font-medium">↑ 15%</span> since last month
                      </p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b">
                      <h3 className="text-lg font-medium">Recent Activity</h3>
                    </div>
                    <div className="px-6 py-4">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">Michael Chen</span> registered a new account
                            </p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Car className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">Sarah Johnson</span> added a new car listing
                            </p>
                            <p className="text-xs text-gray-500">5 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <Settings className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">AutoCare Express</span> joined as a service provider
                            </p>
                            <p className="text-xs text-gray-500">Yesterday</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                            <Bell className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">Jessica Rodriguez</span> left a new review
                            </p>
                            <p className="text-xs text-gray-500">Yesterday</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === "users" && (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        placeholder="Search users..." 
                        className="pl-10"
                      />
                    </div>
                    <Button>Add New User</Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          { id: "1", name: "John Smith", email: "john@example.com", role: "User", status: "active" },
                          { id: "2", name: "Sarah Johnson", email: "sarah@example.com", role: "User", status: "active" },
                          { id: "3", name: "Michael Chen", email: "michael@example.com", role: "Service Provider", status: "active" },
                          { id: "4", name: "Jessica Rodriguez", email: "jessica@example.com", role: "User", status: "inactive" },
                          { id: "5", name: "David Wilson", email: "david@example.com", role: "User", status: "pending" }
                        ].map(user => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{user.role}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Select 
                                defaultValue={user.status} 
                                onValueChange={(value) => handleUserStatusChange(user.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active" className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                                    Active
                                  </SelectItem>
                                  <SelectItem value="pending" className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-yellow-500"></span>
                                    Pending
                                  </SelectItem>
                                  <SelectItem value="inactive" className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
                                    Inactive
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" /> View
                                </Button>
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="destructive" size="sm">Delete</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <div className="text-sm text-gray-500">
                      Showing 1 to 5 of 50 results
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>Previous</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Car Listings Tab */}
              {activeTab === "listings" && (
                <CarListingManagement />
              )}

              {/* Service Providers Tab */}
              {activeTab === "providers" && (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        placeholder="Search providers..." 
                        className="pl-10"
                      />
                    </div>
                    <Button>Add New Provider</Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Provider
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rating
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {serviceProviders.map((provider) => (
                          <tr key={provider.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img 
                                  src={provider.image} 
                                  alt={provider.name}
                                  className="h-10 w-10 object-cover rounded-full"
                                />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                                  <div className="text-sm text-gray-500">{provider.specialties.join(", ")}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{provider.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="text-sm font-medium mr-1">{provider.rating}</span>
                                <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Select 
                                defaultValue={provider.verified ? "verified" : "pending"} 
                                onValueChange={(value) => handleProviderStatusChange(provider.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="verified" className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    Verified
                                  </SelectItem>
                                  <SelectItem value="pending" className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                    Pending
                                  </SelectItem>
                                  <SelectItem value="rejected" className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-red-500" />
                                    Rejected
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/services/${provider.id}`}>
                                    <Eye className="h-4 w-4 mr-1" /> View
                                  </Link>
                                </Button>
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="destructive" size="sm">Delete</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <div className="text-sm text-gray-500">
                      Showing all {serviceProviders.length} providers
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>Previous</Button>
                      <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <AdminNotifications />
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium">Platform Settings</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="text-md font-medium mb-4">General Settings</h4>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                            Site Name
                          </label>
                          <Input
                            id="siteName"
                            name="siteName"
                            defaultValue="WheelsTrust"
                            className="max-w-md"
                          />
                        </div>
                        <div>
                          <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                            Site Description
                          </label>
                          <textarea
                            id="siteDescription"
                            name="siteDescription"
                            rows={3}
                            className="max-w-md w-full rounded-md border border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-primary focus:border-primary"
                            defaultValue="Your trusted platform for buying, selling, and servicing vehicles with complete transparency."
                          />
                        </div>
                        <div>
                          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Email
                          </label>
                          <Input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            defaultValue="info@wheelstrust.com"
                            className="max-w-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md font-medium mb-4">Security Settings</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="twoFactor"
                              name="twoFactor"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="twoFactor" className="font-medium text-gray-700">
                              Enable Two-Factor Authentication
                            </label>
                            <p className="text-gray-500">
                              Increase security by requiring a second authentication method.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="loginNotifications"
                              name="loginNotifications"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="loginNotifications" className="font-medium text-gray-700">
                              Email Notifications for New Logins
                            </label>
                            <p className="text-gray-500">
                              Receive email notifications when a new login is detected.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <Button>Save Settings</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
