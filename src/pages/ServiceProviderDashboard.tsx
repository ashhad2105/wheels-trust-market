import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Car, 
  Calendar,
  Settings, 
  User, 
  LogOut, 
  Home, 
  Menu,
  Bell,
  Mail,
  Plus,
  Edit,
  Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import ServiceManagement from "@/components/service/ServiceManagement";
import CarListingManagement from "@/components/car/CarListingManagement";

const ServiceProviderDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"dashboard" | "services" | "cars" | "bookings" | "reviews" | "profile">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect if not authenticated or not service provider
  if (!isAuthenticated || user?.role !== "service_provider") {
    return <Navigate to="/" replace />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data
  const pendingBookings = [
    { id: 1, service: "Oil Change", customer: "John Smith", date: "2025-05-01", time: "10:00 AM", status: "pending" },
    { id: 2, service: "Tire Rotation", customer: "Sarah Johnson", date: "2025-05-02", time: "2:30 PM", status: "pending" },
    { id: 3, service: "Brake Inspection", customer: "Michael Chen", date: "2025-05-03", time: "11:15 AM", status: "pending" },
  ];

  const completedBookings = [
    { id: 4, service: "Oil Change", customer: "Jessica Rodriguez", date: "2025-04-25", time: "9:00 AM", status: "completed" },
    { id: 5, service: "Engine Diagnostic", customer: "David Kim", date: "2025-04-24", time: "3:45 PM", status: "completed" },
  ];

  const services = [
    { id: 1, name: "Standard Oil Change", price: "$49.99", duration: "30 min", status: "active" },
    { id: 2, name: "Premium Oil Change", price: "$89.99", duration: "45 min", status: "active" },
    { id: 3, name: "Tire Rotation", price: "$60.00", duration: "60 min", status: "active" },
    { id: 4, name: "Brake Pad Replacement", price: "$180.00", duration: "120 min", status: "active" },
    { id: 5, name: "Multi-Point Inspection", price: "$120.00", duration: "60 min", status: "inactive" },
  ];

  const reviews = [
    { id: 1, customer: "John Smith", service: "Oil Change", rating: 5, comment: "Great service and very professional. Will definitely return.", date: "2025-04-22" },
    { id: 2, customer: "Sarah Johnson", service: "Brake Pad Replacement", rating: 4, comment: "Good work, but took a bit longer than expected.", date: "2025-04-20" },
    { id: 3, customer: "Michael Chen", service: "Tire Rotation", rating: 5, comment: "Excellent service and fair pricing.", date: "2025-04-18" },
  ];

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
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">Service Provider</p>
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
                  onClick={() => setActiveTab("services")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "services"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  My Services
                </button>
                <button
                  onClick={() => setActiveTab("cars")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "cars"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Car className="h-5 w-5" />
                  Car Listings
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "bookings"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Calendar className="h-5 w-5" />
                  Bookings
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "reviews"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Mail className="h-5 w-5" />
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <User className="h-5 w-5" />
                  Profile
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
                  {activeTab === "dashboard" && "Service Provider Dashboard"}
                  {activeTab === "services" && "My Services"}
                  {activeTab === "cars" && "Car Listings"}
                  {activeTab === "bookings" && "Manage Bookings"}
                  {activeTab === "reviews" && "Customer Reviews"}
                  {activeTab === "profile" && "Profile Settings"}
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
                          <p className="text-gray-500 text-sm">Today's Bookings</p>
                          <p className="text-2xl font-bold">3</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-sm">Pending Bookings</p>
                          <p className="text-2xl font-bold">{pendingBookings.length}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-sm">Active Services</p>
                          <p className="text-2xl font-bold">{services.filter(s => s.status === "active").length}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                          <Settings className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-sm">Average Rating</p>
                          <p className="text-2xl font-bold">4.7</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center">
                          <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Bookings */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b">
                      <h3 className="text-lg font-medium">Upcoming Bookings</h3>
                    </div>
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {pendingBookings.map((booking) => (
                              <tr key={booking.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.customer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-blue-600 hover:text-blue-900 mr-3">Complete</button>
                                  <button className="text-red-600 hover:text-red-900">Cancel</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Recent Reviews */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b">
                      <h3 className="text-lg font-medium">Recent Reviews</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {reviews.slice(0, 2).map((review) => (
                          <div key={review.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium">{review.customer}</p>
                                <p className="text-sm text-gray-500">{review.service} • {review.date}</p>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-5 w-5 ${
                                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                        <div className="text-center">
                          <button 
                            className="text-primary hover:text-blue-700 font-medium"
                            onClick={() => setActiveTab("reviews")}
                          >
                            View All Reviews
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {activeTab === "services" && (
                <ServiceManagement />
              )}

              {/* Cars Tab */}
              {activeTab === "cars" && (
                <CarListingManagement />
              )}
              
              {/* Bookings Tab */}
              {activeTab === "bookings" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b">
                      <h3 className="text-lg font-medium">Pending Bookings</h3>
                    </div>
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {pendingBookings.map((booking) => (
                              <tr key={booking.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.customer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-green-600 hover:text-green-900 mr-3">Complete</button>
                                  <button className="text-red-600 hover:text-red-900">Cancel</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b">
                      <h3 className="text-lg font-medium">Completed Bookings</h3>
                    </div>
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {completedBookings.map((booking) => (
                              <tr key={booking.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.customer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-lg font-semibold">Customer Reviews</h2>
                      <p className="text-gray-500 text-sm">
                        See what customers are saying about your services
                      </p>
                    </div>
                    <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center">
                      <span className="text-lg font-bold text-blue-700 mr-2">4.7</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < 4 ? "text-yellow-400" : "text-yellow-400 opacity-50"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">(23 reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-medium text-lg">{review.customer}</p>
                            <p className="text-sm text-gray-500">{review.service} • {review.date}</p>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-start space-x-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Mail className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <textarea
                                className="w-full rounded-md border border-gray-300 text-sm p-2 focus:outline-none focus:ring-primary focus:border-primary"
                                rows={2}
                                placeholder="Reply to this review..."
                              ></textarea>
                              <div className="mt-2 text-right">
                                <Button size="sm">Send Reply</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium">Profile Settings</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                          <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <User className="h-16 w-16 text-gray-500" />
                          </div>
                          <Button variant="outline" className="w-full">
                            Upload Photo
                          </Button>
                          <p className="mt-2 text-xs text-gray-500">
                            PNG, JPG or GIF up to 5MB
                          </p>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="space-y-6">
                          <h4 className="text-md font-medium mb-4">Business Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                                Business Name
                              </label>
                              <Input
                                id="businessName"
                                defaultValue="AutoCare Express"
                              />
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                              </label>
                              <Input
                                id="email"
                                type="email"
                                defaultValue="contact@autocareexpress.com"
                              />
                            </div>
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                              </label>
                              <Input
                                id="phone"
                                defaultValue="(555) 123-4567"
                              />
                            </div>
                            <div>
                              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                                Website
                              </label>
                              <Input
                                id="website"
                                defaultValue="https://autocareexpress.com"
                              />
                            </div>
                            <div>
                              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                              </label>
                              <Input
                                id="address"
                                defaultValue="123 Auto Avenue"
                              />
                            </div>
                            <div>
                              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                City
                              </label>
                              <Input
                                id="city"
                                defaultValue="San Francisco"
                              />
                            </div>
                            <div>
                              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                State
                              </label>
                              <Input
                                id="state"
                                defaultValue="CA"
                              />
                            </div>
                            <div>
                              <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                                Zip Code
                              </label>
                              <Input
                                id="zip"
                                defaultValue="94107"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-1">
                              Business Description
                            </label>
                            <textarea
                              id="businessDescription"
                              className="w-full rounded-md border border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-primary focus:border-primary"
                              rows={4}
                              defaultValue="Professional automotive service center with certified mechanics specializing in routine maintenance, repairs, and diagnostics for all makes and models."
                            ></textarea>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Specialties
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                  defaultChecked
                                />
                                <span className="ml-2 text-sm text-gray-700">Oil Changes</span>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                  defaultChecked
                                />
                                <span className="ml-2 text-sm text-gray-700">Brakes</span>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                  defaultChecked
                                />
                                <span className="ml-2 text-sm text-gray-700">Tires</span>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-700">Engine Repair</span>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-700">Transmission</span>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-700">Electrical</span>
                              </div>
                            </div>
                          </div>
                          <div className="pt-4 border-t">
                            <Button>Save Changes</Button>
                          </div>
                        </div>
                      </div>
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

// This is needed to render the icon in the service provider dashboard
const Clock = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default ServiceProviderDashboard;
