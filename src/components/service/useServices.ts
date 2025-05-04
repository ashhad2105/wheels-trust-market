
import { useState, useEffect } from "react";
import { ServiceType } from "@/types/service";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export const useServices = (initialServices?: ServiceType[], isPreview = false) => {
  const [services, setServices] = useState<ServiceType[]>(initialServices || []);
  const [filteredServices, setFilteredServices] = useState<ServiceType[]>(initialServices || []);
  const [isLoading, setIsLoading] = useState<boolean>(!initialServices);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!initialServices && !isPreview) {
      fetchServices();
    }
  }, [initialServices, isPreview]);

  const fetchServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      console.log("Fetching services from:", apiUrl);
      
      const response = await axios.get(
        `${apiUrl}/api/v1/services?t=${timestamp}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          timeout: 10000 // 10 second timeout
        }
      );
      
      console.log("Services API response:", response.data);

      if (response.data.success) {
        const backendServices = response.data.data || [];
        
        const formattedServices: ServiceType[] = backendServices.map((service: any) => ({
          id: service._id || String(service.id), 
          name: service.name || "Unnamed Service",
          description: service.description || "No description available",
          price: service.price ? `$${service.price}` : "Price not available",
          duration: service.duration ? `${service.duration} minutes` : "Duration not specified",
          category: service.category || "other",
          status: service.status || "active",
          provider: {
            id: service.serviceProvider?._id || "",
            name: service.serviceProvider?.name || "Unknown Provider",
            rating: service.serviceProvider?.rating || 4.5,
            reviewCount: service.serviceProvider?.reviewCount || 0,
            image: service.serviceProvider?.image || "/placeholder.svg",
            location: service.serviceProvider?.location || "Unknown Location",
            specialties: service.serviceProvider?.specialties || [],
            description: service.serviceProvider?.description || "",
            verified: service.serviceProvider?.verified || false
          },
          image: service.image || "/placeholder.svg",
          rating: service.rating || 4.5
        }));
        
        console.log("Formatted services:", formattedServices);
        
        setServices(formattedServices);
        setFilteredServices(formattedServices);
      } else {
        setError("Failed to fetch services");
        toast({
          title: "Error",
          description: "Failed to fetch services data",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error fetching services:", error);
      
      // More specific error messages based on the error type
      if (error.code === 'ECONNABORTED') {
        setError("Connection timed out. The server might be down or unreachable.");
      } else if (error.code === 'ERR_NETWORK') {
        setError("Network error. Please check your connection and ensure the backend is running.");
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else {
        setError("Failed to fetch services. Check if backend server is running.");
      }
      
      toast({
        title: "Connection Error",
        description: "Could not connect to the backend service. Is the server running?",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    services,
    filteredServices,
    setFilteredServices,
    isLoading,
    error,
    fetchServices
  };
};
