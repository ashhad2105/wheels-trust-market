
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CarIcon, Upload } from "lucide-react";

const sellCarSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  make: z.string().min(1, { message: "Make is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  year: z.string()
    .regex(/^\d{4}$/, { message: "Year must be a 4-digit number" }),
  price: z.string()
    .regex(/^\d+$/, { message: "Price must be a number" }),
  mileage: z.string()
    .regex(/^\d+$/, { message: "Mileage must be a number" }),
  fuelType: z.string().min(1, { message: "Fuel type is required" }),
  transmission: z.string().min(1, { message: "Transmission is required" }),
  condition: z.string().min(1, { message: "Condition is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
});

const CarsSell = () => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  
  const form = useForm<z.infer<typeof sellCarSchema>>({
    resolver: zodResolver(sellCarSchema),
    defaultValues: {
      title: "",
      make: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      fuelType: "",
      transmission: "",
      condition: "",
      location: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof sellCarSchema>) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    
    // In a real app, this would submit to an API
    console.log("Form values:", values);
    console.log("Images:", images);
    
    // Show success message
    alert("Your car listing has been submitted and is pending review.");
    navigate("/profile");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <Helmet>
        <title>Sell Your Car | WheelsTrust</title>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <CarIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Sell Your Car</h1>
                <p className="text-gray-600">List your vehicle on WheelsTrust marketplace</p>
              </div>
            </div>
            
            {!isAuthenticated ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Sign in to list your car</h3>
                <p className="text-gray-600 mb-4">You need to be logged in to create a listing</p>
                <Button onClick={openAuthModal}>Login or Sign Up</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Listing Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 2018 Honda Civic EX - Low Miles" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="15000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="make"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Make</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Honda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Civic" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 2018" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mileage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mileage</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 45000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fuelType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuel Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select fuel type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="gasoline">Gasoline</SelectItem>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="electric">Electric</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transmission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transmission</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select transmission type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="automatic">Automatic</SelectItem>
                              <SelectItem value="manual">Manual</SelectItem>
                              <SelectItem value="cvt">CVT</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Condition</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select car condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Excellent">Excellent</SelectItem>
                              <SelectItem value="Good">Good</SelectItem>
                              <SelectItem value="Fair">Fair</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. New York, NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your car in detail. Include features, condition, history, etc." 
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image upload */}
                  <div className="space-y-2">
                    <FormLabel>Car Images</FormLabel>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm font-medium">Click to upload photos</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB each</p>
                      <input 
                        type="file" 
                        id="image-upload" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </div>
                    
                    {images.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={URL.createObjectURL(image)}
                              alt={`Car image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-md"
                            />
                            <button 
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full md:w-auto button-gradient">
                      Submit Listing
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default CarsSell;
