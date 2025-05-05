
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Car } from "lucide-react";
import CarListingForm from "./car-listing/CarListingForm";
import CarListingCard from "./car-listing/CarListingCard";
import CarListingHeader from "./car-listing/CarListingHeader";
import CarListingTabs from "./car-listing/CarListingTabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export interface CarListing {
  id: string;
  title: string;
  year: string;
  make: string;
  model: string;
  price: string;
  mileage: string;
  description: string;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  location: string;
  status: "active" | "sold" | "pending" | "draft";
  images: string[];
}

const CarListingManagement: React.FC = () => {
  const [listings, setListings] = useState<CarListing[]>([
    {
      id: "1",
      title: "2018 Toyota Camry XSE",
      year: "2018",
      make: "Toyota",
      model: "Camry XSE",
      price: "19500",
      mileage: "45000",
      description: "Well maintained Toyota Camry with low mileage. Features include leather seats, sunroof, and premium sound system.",
      condition: "Excellent",
      location: "San Francisco, CA",
      status: "active",
      images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&h=200"]
    },
    {
      id: "2",
      title: "2020 Honda Accord Sport",
      year: "2020",
      make: "Honda",
      model: "Accord Sport",
      price: "23800",
      mileage: "28000",
      description: "One owner Honda Accord in pristine condition. Includes Honda Sensing safety features and Apple CarPlay.",
      condition: "Excellent",
      location: "Oakland, CA",
      status: "active",
      images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&h=200"]
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editListing, setEditListing] = useState<CarListing | null>(null);
  const { toast } = useToast();

  const handleAddListing = (newListing: Partial<CarListing>) => {
    const listing: CarListing = {
      id: Date.now().toString(),
      title: `${newListing.year} ${newListing.make} ${newListing.model}`,
      year: newListing.year || "",
      make: newListing.make || "",
      model: newListing.model || "",
      price: newListing.price || "",
      mileage: newListing.mileage || "",
      description: newListing.description || "",
      condition: newListing.condition as "Excellent" | "Good" | "Fair" | "Poor" || "Good",
      location: newListing.location || "",
      status: "active",
      images: newListing.images || []
    };

    setListings([...listings, listing]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Listing Created",
      description: "Your car listing has been created successfully."
    });
  };

  const handleEditListing = (updatedListing: CarListing) => {
    setListings(listings.map(listing => 
      listing.id === updatedListing.id ? updatedListing : listing
    ));
    setEditListing(null);
    
    toast({
      title: "Listing Updated",
      description: "Your car listing has been updated successfully."
    });
  };

  const handleDeleteListing = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
    
    toast({
      title: "Listing Deleted",
      description: "The car listing has been deleted successfully."
    });
  };

  const handleStatusChange = (id: string, status: CarListing['status']) => {
    setListings(listings.map(listing => 
      listing.id === id ? { ...listing, status } : listing
    ));
    
    toast({
      title: "Status Updated",
      description: `Listing status has been changed to ${status}.`
    });
  };

  return (
    <div className="space-y-6">
      <CarListingHeader 
        onAddClick={() => setIsAddDialogOpen(true)} 
      />

      {/* Edit listing dialog */}
      <Dialog open={!!editListing} onOpenChange={(open) => !open && setEditListing(null)}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Edit Car Listing</DialogTitle>
            <DialogDescription>
              Update your car listing details.
            </DialogDescription>
          </DialogHeader>
          {editListing && (
            <CarListingForm 
              initialData={editListing} 
              onSave={handleEditListing} 
              onCancel={() => setEditListing(null)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add listing dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Add New Car Listing</DialogTitle>
            <DialogDescription>
              Create a new car listing to sell a vehicle.
            </DialogDescription>
          </DialogHeader>
          <CarListingForm 
            onSave={handleAddListing} 
            onCancel={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      <CarListingTabs
        listings={listings}
        onEdit={setEditListing}
        onDelete={handleDeleteListing}
        onStatusChange={handleStatusChange}
        onAdd={() => setIsAddDialogOpen(true)}
        EmptyState={EmptyListingState}
      />
    </div>
  );
};

const EmptyListingState = ({ onAdd }: { onAdd: () => void }) => (
  <div className="text-center py-12 bg-gray-50 rounded-lg">
    <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium mb-1">No Listings Yet</h3>
    <p className="text-gray-500 mb-4">You haven't created any car listings yet.</p>
    <button 
      onClick={onAdd}
      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
    >
      Create Your First Listing
    </button>
  </div>
);

export default CarListingManagement;
