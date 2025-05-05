
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CarListingHeaderProps {
  onAddClick: () => void;
}

const CarListingHeader: React.FC<CarListingHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Car Listings</h2>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-2" /> Add Listing
      </Button>
    </div>
  );
};

export default CarListingHeader;
