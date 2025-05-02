import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceData {
  id: string;
  name: string;
  provider: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  coverImage: string;
  images: string[];
  features: string[];
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    lng: number;
  };
  availability: { day: string; hours: string }[];
}

// In the mock data, ensure rating is a number
const serviceData: ServiceData = {
  id: "1",
  name: "Premium Car Detailing",
  provider: "AutoCare Express",
  description: "Our premium detailing service includes exterior wash, wax, interior cleaning, and protection treatments to keep your vehicle looking its best.",
  price: 149.99,
  duration: "3 hours",
  rating: 4.8, // This is now a number instead of a string
  reviewCount: 24,
  coverImage: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&h=600",
  images: [
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1635260107979-45760253f518?auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1676122565108-d642ae67b4c4?auto=format&fit=crop&w=800&h=600",
  ],
  features: [
    "Exterior hand wash and dry",
    "Paint decontamination",
    "High-quality wax application",
    "Interior vacuum and cleaning",
    "Dashboard and trim conditioning",
    "Tire and wheel detailing",
    "Window cleaning inside and out",
  ],
  location: {
    address: "123 Auto Avenue",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    lat: 37.7749,
    lng: -122.4194
  },
  availability: [
    { day: "Monday", hours: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ]
};

const ServiceDetails = () => {
  return (
    <>
      <Helmet>
        <title>{serviceData.name} | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img 
              src={serviceData.coverImage} 
              alt={serviceData.name} 
              className="w-full h-80 object-cover object-center" 
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">{serviceData.name}</h1>
              <div className="flex items-center text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(serviceData.rating) ? '' : 'opacity-50'}`} />
                ))}
                <span className="text-white ml-2 text-sm">
                  {serviceData.rating} ({serviceData.reviewCount} reviews)
                </span>
              </div>
              <p className="text-gray-300">{serviceData.description}</p>
            </div>
          </div>
          
          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Gallery */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {serviceData.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`Service ${index + 1}`} 
                    className="w-full h-40 object-cover rounded-lg shadow-md" 
                  />
                ))}
              </div>
            </div>
            
            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc list-inside text-gray-700">
                {serviceData.features.map((feature, index) => (
                  <li key={index} className="mb-2">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Provider Info */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Service Provider</h2>
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium">{serviceData.provider}</h3>
              <p className="text-gray-600 mb-2">
                {/* Additional info about the provider can go here */}
                Professional auto care services since 2010.
              </p>
              <div className="flex items-center text-gray-700 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                {serviceData.location.address}, {serviceData.location.city}, {serviceData.location.state} {serviceData.location.zip}
              </div>
              <Link to="/about" className="text-primary hover:underline">
                Learn more about {serviceData.provider}
              </Link>
            </div>
          </div>
          
          {/* Availability */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceData.availability.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow-md p-4">
                  <div className="flex items-center text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    {item.day}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-2" />
                    {item.hours}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Booking Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Book Now</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 mb-4">
                Schedule your {serviceData.name} appointment today!
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-primary">
                  ${serviceData.price.toFixed(2)}
                </div>
                <div className="text-gray-600">
                  <Clock className="inline-block h-4 w-4 mr-1" />
                  {serviceData.duration}
                </div>
              </div>
              <Button className="w-full">Book Appointment</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ServiceDetails;
