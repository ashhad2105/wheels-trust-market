
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { services } from "@/lib/data";
import { Calendar, MapPin, Clock, Phone, MessageSquare, Star } from "lucide-react";
import Modal from "@/components/ui/modal";

const ServiceDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  
  // Find the service with the matching ID - convert string id to number for comparison
  const service = services.find(s => s.id === parseInt(id as string));
  
  if (!service) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="mb-6">The service you're looking for doesn't exist or has been removed.</p>
          <Link to="/services">
            <Button>Browse All Services</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }
  
  const handleContactClick = () => {
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      setIsContactModalOpen(true);
    }
  };
  
  const handleSubmitMessage = () => {
    // In a real app, this would send the message to the backend
    alert("Your inquiry has been sent!");
    setMessage("");
    setIsContactModalOpen(false);
  };
  
  const serviceImages = [
    service.image,
    "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&auto=format&fit=crop",
  ];
  
  const [activeImage, setActiveImage] = useState(serviceImages[0]);

  return (
    <>
      <Helmet>
        <title>{service.name} | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Link to="/services" className="text-sm text-gray-500 hover:text-primary">
                Services
              </Link>
              <span className="text-gray-400">/</span>
              <Link to="/services" className="text-sm text-gray-500 hover:text-primary">
                {service.category}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-sm text-gray-500">
                {service.name}
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold">
                {service.name}
              </h1>
              <Badge variant="outline" className="text-sm">
                {service.category}
              </Badge>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img 
                    src={activeImage} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2">
                    {serviceImages.map((img, idx) => (
                      <div 
                        key={idx}
                        className={`cursor-pointer border-2 rounded overflow-hidden ${
                          activeImage === img ? 'border-primary' : 'border-transparent'
                        }`}
                        onClick={() => setActiveImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`Service view ${idx + 1}`} 
                          className="w-full h-16 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <Tabs defaultValue="overview">
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Description</h3>
                      <p className="text-gray-700">
                        {service.description || "This service provides professional automotive care with attention to detail and quality workmanship. Our certified technicians use state-of-the-art equipment to ensure your vehicle receives the best possible service."}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Service Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded flex items-center">
                          <Clock className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <div className="text-xs text-gray-500">Duration</div>
                            <div className="font-medium">{service.duration}</div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded flex items-center">
                          <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <div className="text-xs text-gray-500">Location</div>
                            <div className="font-medium">{service.provider.location}</div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded flex items-center">
                          <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <div className="text-xs text-gray-500">Availability</div>
                            <div className="font-medium">Mon-Sat, 8AM-6PM</div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 mr-3" />
                          <div>
                            <div className="text-xs text-gray-500">Rating</div>
                            <div className="font-medium">{service.rating} (24 reviews)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium mb-3">Service Features</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Certified Technicians</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Quality Parts & Materials</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Warranty Included</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Digital Reporting</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Free Follow-up</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Mobile Service Available</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium mb-3">Customer Reviews</h3>
                      
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop" alt="Customer" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="font-medium">Michael Johnson</div>
                                <div className="text-xs text-gray-500">2 months ago</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">
                            Great service! My car was serviced quickly and professionally. The technicians explained everything they did and even showed me the worn parts they replaced. Highly recommend!
                          </p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop" alt="Customer" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="font-medium">Sarah Williams</div>
                                <div className="text-xs text-gray-500">1 month ago</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[1, 2, 3, 4].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                              <Star className="h-4 w-4 text-gray-300" />
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">
                            Very satisfied with the brake service I received. Fair pricing and completed on time as promised. The only reason for 4 stars instead of 5 is that the waiting area could use some updating.
                          </p>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Load More Reviews
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Service Provider</h3>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 overflow-hidden">
                    <img 
                      src={service.provider.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop"}
                      alt="Provider" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{service.provider.name}</div>
                    <div className="text-sm text-gray-600">
                      Certified Service Provider
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{service.provider.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-gray-500 ml-1">5.0 (42 reviews)</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="text-lg font-bold mb-1">
                    Starting from {service.price}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Final price may vary based on vehicle model and condition
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full button-gradient text-white"
                    onClick={handleContactClick}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Provider
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Book Appointment
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Our Guarantee</h4>
                <p className="text-sm text-gray-600 mb-4">
                  All services booked through WheelsTrust are backed by our service guarantee.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <svg className="h-4 w-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Verified Service Providers</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <svg className="h-4 w-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Secure Payments</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <svg className="h-4 w-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Satisfaction Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Contact Modal */}
      <Modal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        title="Contact Service Provider"
      >
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
              <img 
                src={service.provider.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop"}
                alt="Provider" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{service.provider.name}</div>
              <div className="text-xs text-gray-600">Usually responds within 1 hour</div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <span className="text-sm">
              Regarding: <strong>{service.name}</strong>
            </span>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea 
              id="message"
              className="w-full border border-gray-300 rounded-md p-3 min-h-[120px] focus:ring-primary focus:border-primary"
              placeholder="Hi, I'm interested in your service. Do you have any availability next week?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1 button-gradient text-white"
              onClick={handleSubmitMessage}
              disabled={!message.trim()}
            >
              Send Message
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsContactModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ServiceDetails;
