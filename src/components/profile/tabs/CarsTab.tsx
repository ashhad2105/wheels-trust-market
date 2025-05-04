
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Car } from "lucide-react";
import ProfileCard from "../ProfileCard";

const CarsTab = () => {
  const navigate = useNavigate();
  
  return (
    <ProfileCard
      title="My Cars"
      description="View and manage your car listings and purchases."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">My Listings</h3>
          <Button size="sm" variant="outline">+ New Listing</Button>
        </div>
        
        <div className="text-center py-8">
          <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-1">No Cars Listed Yet</h3>
          <p className="text-gray-500 mb-4">You haven't listed any cars for sale yet.</p>
          <Button onClick={() => navigate('/cars/sell')}>Sell a Car</Button>
        </div>
        
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
