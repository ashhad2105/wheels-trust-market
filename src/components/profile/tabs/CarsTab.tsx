
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Car, Edit, Trash2, Eye } from "lucide-react";
import ProfileCard from "../ProfileCard";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

interface UserCar {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image: string;
}

const CarsTab = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [userCars, setUserCars] = useState<UserCar[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Fetch user's car listings
  useEffect(() => {
    const fetchUserCars = async () => {
      if (!user?.id || !token) return;
      
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        if (response.data.success) {
          setUserCars(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user cars:", error);
        // For demo purposes, let's add a mock car
        setUserCars([
          {
            id: "mock-car-1",
            make: "Honda",
            model: "Accord",
            year: 2020,
            price: 22500,
            mileage: 15000,
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=120&h=80"
          },
          {
            id: "mock-car-2",
            make: "Toyota",
            model: "Camry",
            year: 2019,
            price: 19800,
            mileage: 25000,
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=120&h=80"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserCars();
  }, [user, token]);
  
  const handleEditCar = (carId: string) => {
    navigate(`/cars/sell?edit=${carId}`);
  };
  
  const handleDeleteCar = async (carId: string) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }
    
    try {
      setLoading(true);
      // In a real app, we would make an API call here
      // await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars/${carId}`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      
      // For demo purposes, we'll just remove it from the state
      setUserCars(userCars.filter(car => car.id !== carId));
      
      toast({
        title: "Car listing deleted",
        description: "Your car listing has been successfully removed."
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "There was a problem deleting your car listing.",
        variant: "destructive"
      });
      console.error("Error deleting car:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ProfileCard
      title="My Cars"
      description="View and manage your car listings and purchases."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">My Listings</h3>
          <Button size="sm" onClick={() => navigate('/cars/sell')}>+ New Listing</Button>
        </div>
        
        {loading ? (
          <div className="text-center py-6">Loading your cars...</div>
        ) : userCars.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {userCars.map(car => (
              <div key={car.id} className="border border-gray-200 rounded-md overflow-hidden flex">
                <div className="w-1/3 bg-gray-100">
                  <img 
                    src={car.image} 
                    alt={`${car.year} ${car.make} ${car.model}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <h4 className="font-medium">{car.year} {car.make} {car.model}</h4>
                  <p className="text-sm text-gray-600 mb-2">${car.price.toLocaleString()} • {car.mileage.toLocaleString()} miles</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => navigate(`/cars/details/${car.id}`)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditCar(car.id)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => handleDeleteCar(car.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">No Cars Listed Yet</h3>
            <p className="text-gray-500 mb-4">You haven't listed any cars for sale yet.</p>
            <Button onClick={() => navigate('/cars/sell')}>Sell a Car</Button>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Saved Cars</h3>
            <Button size="sm" variant="ghost">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-md overflow-hidden flex">
              <div className="w-1/3 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=120&h=80" 
                  alt="Honda Accord" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-3">
                <h4 className="font-medium">2020 Honda Accord</h4>
                <p className="text-sm text-gray-600 mb-2">$22,500 • 15,000 miles</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">View</Button>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-destructive hover:text-destructive">Unsave</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileCard>
  );
};

export default CarsTab;
