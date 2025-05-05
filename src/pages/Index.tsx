
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CarListingPreview from "@/components/home/CarListingPreview";
import ServiceSection from "@/components/home/ServiceSection";
import Testimonials from "@/components/home/Testimonials";
import { cars, services as initialServices } from "@/lib/data";
import { ServiceType } from "@/types/service";

const Index = () => {
  // Convert data.ts services to the correct ServiceType
  const services: ServiceType[] = initialServices.map(service => ({
    ...service,
    provider: {
      ...service.provider,
      image: "/placeholder.svg",
      location: "Local Area",
      specialties: [],
      description: "",
    }
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CarListingPreview cars={cars} />
        <ServiceSection services={services} />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
