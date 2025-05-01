
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CarsSell = () => {
  return (
    <>
      <Helmet>
        <title>Sell Your Car | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sell Your Car</h1>
            <p className="text-gray-600 mb-6">
              List your vehicle on WheelsTrust and connect with thousands of potential buyers.
              Our platform makes selling your car simple, safe, and rewarding.
            </p>
          </div>
          
          {/* Car selling form will go here */}
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <p className="text-center text-lg mb-8">
              Coming Soon! Our car listing feature is under development.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default CarsSell;
