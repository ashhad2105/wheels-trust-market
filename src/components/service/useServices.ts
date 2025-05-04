
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
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/services`
      );
      
      console.log("Services API response:", response.data);

      if (response.data.success) {
        const backendServices = response.data.data || [];
        
        const formattedServices: ServiceType[] = backendServices.map((service: any) => ({
          id: service._id || String(service.id), 
          name: service.name,
          description: service.description,
          price: `$${service.price}`,
          duration: `${service.duration} minutes`,
          category: service.category,
          status: service.status,
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
        
        setServices(formattedServices);
        setFilteredServices(formattedServices);
      } else {
        setError("Failed to fetch services");
        toast({
          title: "Error",
          description: "Failed to fetch services",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to fetch services");
      toast({
        title: "Error",
        description: "Failed to fetch services. Please try again later.",
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
