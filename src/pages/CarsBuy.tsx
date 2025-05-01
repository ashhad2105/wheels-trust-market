
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CarGrid from "@/components/car/CarGrid";
import { cars } from "@/lib/data";
import { Button } from "@/components/ui/button";

const CarsBuy = () => {
  return (
    <>
      <Helmet>
        <title>Buy Cars | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Car</h1>
            <p className="text-gray-600 mb-6">
              Browse our selection of quality vehicles from trusted sellers. Each car is verified 
              and comes with a detailed history report.
            </p>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-primary">{cars.length}</span> cars available
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Save Search
                </Button>
                <Button variant="outline" size="sm">
                  Compare
                </Button>
              </div>
            </div>
          </div>
          
          <CarGrid cars={cars} />
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default CarsBuy;
