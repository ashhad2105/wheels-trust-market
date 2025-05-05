
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
      
      console.log("Fetching service providers from:", apiUrl);
      
      const response = await axios.get(
        `${apiUrl}/api/v1/service-providers?t=${timestamp}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          timeout: 10000 // 10 second timeout
        }
      );
      
      console.log("Service providers API response:", response.data);

      if (response.data.success) {
        const backendProviders = response.data.data?.serviceProviders || [];
        
        const formattedServices: ServiceType[] = backendProviders.map((provider: any) => ({
          id: provider._id || String(provider.id), 
          name: provider.name || "Unnamed Provider",
          description: provider.description || "No description available",
          price: provider.price ? `$${provider.price}` : "Price varies",
          duration: provider.workHours || "Hours not specified",
          category: provider.specialties?.[0] || "other",
          status: provider.status || "active",
          provider: {
            id: provider._id || "",
            name: provider.name || "Unknown Provider",
            rating: provider.rating || 4.5,
            reviewCount: provider.reviewCount || 0,
            image: provider.image || "/placeholder.svg",
            location: provider.location || "Unknown Location",
            specialties: provider.specialties || [],
            description: provider.description || "",
            verified: provider.isVerified || false
          },
          image: provider.image || "/placeholder.svg",
          rating: provider.rating || 4.5
        }));
        
        console.log("Formatted service providers:", formattedServices);
        
        setServices(formattedServices);
        setFilteredServices(formattedServices);
      } else {
        setError("Failed to fetch service providers");
        toast({
          title: "Error",
          description: "Failed to fetch service providers data",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error fetching service providers:", error);
      
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
        setError("Failed to fetch service providers. Check if backend server is running.");
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
