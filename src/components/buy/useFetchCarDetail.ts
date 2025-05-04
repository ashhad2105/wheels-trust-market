
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

interface CarListing {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: "new" | "used" | "certified";
  status: "active" | "sold" | "pending" | "draft";
  images: string[];
  description: string;
  features: string[];
  seller: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export const useFetchCarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCarDetails = async () => {
    if (!id) {
      setError("Car ID is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get<{ success: boolean; data: CarListing }>(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars/${id}`
      );

      console.log("Car detail response:", response.data);

      if (response.data.success) {
        setCar(response.data.data);
      } else {
        setError("Failed to fetch car details");
        toast({
          title: "Error",
          description: "Failed to fetch car details",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
      setError("Failed to fetch car details");
      toast({
        title: "Error",
        description: "Failed to fetch car details. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id, toast]);

  return {
    car,
    isLoading,
    error,
    navigate,
    fetchCarDetails
  };
};
