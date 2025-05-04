
import { useState, useEffect } from "react";
import { CarType } from "@/types/car";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export const useCarListings = (initialCars?: CarType[], isPreview = false) => {
  const [cars, setCars] = useState<CarType[]>(initialCars || []);
  const [filteredCars, setFilteredCars] = useState<CarType[]>(initialCars || []);
  const [isLoading, setIsLoading] = useState<boolean>(!initialCars);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!initialCars && !isPreview) {
      fetchCars();
    }
  }, [initialCars, isPreview]);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars`
      );

      console.log("Cars API response:", response.data);

      if (response.data.success) {
        // Extract cars from response - handle both pagination and direct data formats
        const backendCars = response.data.data.cars || response.data.data || [];
        
        // Convert backend cars to the format expected by the components
        const formattedCars: CarType[] = backendCars.map((car: any) => ({
          id: car._id,
          title: car.title || `${car.year} ${car.make} ${car.model}`,
          make: car.make,
          model: car.model,
          year: parseInt(car.year) || new Date().getFullYear(),
          price: parseFloat(car.price),
          mileage: parseInt(car.mileage),
          condition: car.condition,
          location: car.location,
          description: car.description,
          // Handle images - map Cloudinary URLs
          images: car.images?.map((img: any) => (typeof img === 'string' ? img : img.url)) || [],
          // Use first image as main image or fallback to placeholder
          image: car.images && car.images.length > 0 
            ? (typeof car.images[0] === 'string' ? car.images[0] : car.images[0].url) 
            : "/placeholder.svg",
          seller: car.seller?.name || "Unknown",
          features: car.features || [],
          status: car.status,
          // Add additional properties with proper fallbacks
          color: car.exteriorColor || "Not specified",
          rating: 4.5, // Default value
          reviewCount: 0, // Default value
          fuelType: car.fuelType || "Not specified",
          transmission: car.transmission?.toLowerCase() === 'manual' ? 'manual' : 'automatic',
          sellerType: car.sellerType || "private" // Default to private seller
        }));
        
        setCars(formattedCars);
        setFilteredCars(formattedCars);
      } else {
        setError("Failed to fetch car listings");
        toast({
          title: "Error",
          description: "Failed to fetch car listings",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError("Failed to fetch car listings");
      toast({
        title: "Error", 
        description: "Failed to fetch cars. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cars,
    filteredCars,
    setFilteredCars,
    isLoading,
    error,
    fetchCars
  };
};
