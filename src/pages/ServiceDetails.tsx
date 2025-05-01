
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceType } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Phone, Mail, Star, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Mock service data for now - will be replaced with API call later
const mockService = {
  id: "1",
  name: "Premium Car Detailing",
  description: "Professional interior and exterior detailing service to make your car look brand new.",
  price: "$149.99",
  rating: 4.8,
  category: "maintenance",
  image: "https://images.unsplash.com/photo-1596975100273-6518bd55fa14?auto=format&fit=crop&w=600&h=400",
  provider: {
    id: "p1",
    name: "Auto Spa Services",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=100&h=100",
    verified: true,
    location: "Los Angeles, CA"
  },
  images: [
    "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1635260409896-24714e8373f8?auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1604426633574-6536931c3649?auto=format&fit=crop&w=800&h=600"
  ]
};

const ServiceDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const [service] = useState<ServiceType>(mockService as unknown as ServiceType);
  
  const handleBookService = () => {
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      // Booking logic would go here
      alert("Booking functionality coming soon!");
    }
  };

  const handleContactProvider = () => {
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      // Contact logic would go here
      alert("Contact functionality coming soon!");
    }
  };

  return (
    <>
      <Helmet>
        <title>{service.name} | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex text-sm mb-6">
              <a href="/" className="text-gray-500 hover:text-primary">Home</a>
              <span className="mx-2 text-gray-500">/</span>
              <a href="/services" className="text-gray-500 hover:text-primary">Services</a>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-700">{service.name}</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left column - images and details */}
              <div className="lg:col-span-8">
                {/* Image gallery */}
                <div className="mb-8">
                  <div className="rounded-lg overflow-hidden mb-4 bg-gray-100" style={{ height: "400px" }}>
                    <img
                      src={service.images[activeImage]}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {service.images.map((image, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer rounded-md overflow-hidden h-20 ${
                          activeImage === index ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setActiveImage(index)}
                      >
                        <img
                          src={image}
                          alt={`${service.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Service details */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">{service.name}</h1>
                    <Badge variant="secondary" className="text-sm py-1">
                      {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(service.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{service.rating} rating</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-600">42 reviews</span>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{service.provider.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">60-90 minutes</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Available 7 days</span>
                    </div>
                  </div>
                </div>
                
                {/* Tabs content */}
                <Tabs defaultValue="details" className="mb-8">
                  <TabsList className="mb-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Service Description</h3>
                      <p className="text-gray-700">
                        Our premium car detailing service includes a comprehensive interior and exterior cleaning 
                        and restoration process. We use high-quality products and professional techniques to make 
                        your vehicle look and feel like new again.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">What's Included</h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li>Complete exterior wash and wax</li>
                        <li>Interior vacuum and steam cleaning</li>
                        <li>Leather conditioning and treatment</li>
                        <li>Window and glass cleaning</li>
                        <li>Tire and wheel detailing</li>
                        <li>Engine bay cleaning</li>
                        <li>Paint correction and polishing</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start mb-2">
                        <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden mr-3">
                          <img 
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&h=100" 
                            alt="User" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">John D.</h4>
                            <span className="mx-2 text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">2 weeks ago</span>
                          </div>
                          <div className="flex items-center my-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700">
                            Excellent service! My car looks better than when I first bought it. The team was professional
                            and thorough with every detail. Highly recommend!
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start mb-2">
                        <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden mr-3">
                          <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" 
                            alt="User" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">Sarah M.</h4>
                            <span className="mx-2 text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">1 month ago</span>
                          </div>
                          <div className="flex items-center my-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700">
                            Great service overall. They paid attention to all the details I mentioned and were very friendly.
                            Only reason for 4 stars is that it took longer than estimated.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="faq" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-1">How long does the service take?</h3>
                      <p className="text-gray-700 text-sm">
                        Most standard detailing services take between 60-90 minutes, depending on the size and condition
                        of your vehicle. Premium services may take up to 2-3 hours.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-1">Do I need to provide anything?</h3>
                      <p className="text-gray-700 text-sm">
                        No, we provide all the necessary equipment and products. We just ask that you remove any 
                        personal belongings from the vehicle before the service.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-1">Is there a warranty on the service?</h3>
                      <p className="text-gray-700 text-sm">
                        Yes, we offer a 7-day satisfaction guarantee. If you're not happy with any aspect of our 
                        service, we'll make it right at no additional cost.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Right column - booking and provider */}
              <div className="lg:col-span-4">
                {/* Price and booking card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">{service.price}</h3>
                    <Badge>Best Seller</Badge>
                  </div>
                  
                  <Button 
                    className="w-full mb-4"
                    size="lg"
                    onClick={handleBookService}
                  >
                    Book This Service
                  </Button>
                  
                  <p className="text-sm text-center text-gray-500 mb-4">
                    No payment required until service is completed
                  </p>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                        <img 
                          src={service.provider.image} 
                          alt={service.provider.name}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{service.provider.name}</h4>
                        <p className="text-sm text-gray-600">
                          Service Provider
                          {service.provider.verified && (
                            <span className="inline-flex items-center ml-1 text-green-600">
                              <svg 
                                className="h-3 w-3" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path 
                                  fillRule="evenodd" 
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                  clipRule="evenodd" 
                                />
                              </svg>
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleContactProvider}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Provider
                    </Button>
                  </div>
                </div>
                
                {/* Contact info card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-medium mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-sm">(555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-sm">contact@autospaservices.com</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-sm">{service.provider.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ServiceDetails;
