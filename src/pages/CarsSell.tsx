
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Car } from "lucide-react";

const CarsSell = () => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Listing submitted successfully",
        description: "Your car listing is under review and will be published soon.",
      });
    }, 1500);
  };

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
          
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                <CardTitle>Vehicle Information</CardTitle>
              </div>
              <CardDescription>
                Enter the details of your vehicle to create your listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="make">Make</Label>
                      <Input id="make" placeholder="e.g. Toyota" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input id="model" placeholder="e.g. Camry" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input 
                        id="year" 
                        placeholder="e.g. 2019" 
                        type="number" 
                        min="1900" 
                        max={new Date().getFullYear()} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Mileage</Label>
                      <Input 
                        id="mileage" 
                        placeholder="e.g. 45000" 
                        type="number"
                        min="0"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price" 
                        placeholder="e.g. 18500" 
                        type="number"
                        min="0"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select required>
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select required>
                        <SelectTrigger id="fuelType">
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gasoline">Gasoline</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. Los Angeles, CA" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your vehicle, including features, history, and why you're selling it."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Vehicle Images</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <div className="space-y-2">
                        <div className="flex items-center justify-center">
                          <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <div className="text-sm text-gray-600">
                          <label htmlFor="file-upload" className="text-primary hover:underline cursor-pointer">
                            Click to upload
                          </label>
                          <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" />
                          <p className="mt-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB (max. 5 files)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Listing"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default CarsSell;
