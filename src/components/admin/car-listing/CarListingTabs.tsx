
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarListing } from "../CarListingManagement";
import CarListingCard from "./CarListingCard";
import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarListingTabsProps {
  listings: CarListing[];
  onEdit: (listing: CarListing) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: CarListing['status']) => void;
  onAdd: () => void;
  EmptyState: React.FC<{ onAdd: () => void }>;
}

const CarListingTabs: React.FC<CarListingTabsProps> = ({ 
  listings, onEdit, onDelete, onStatusChange, onAdd, EmptyState 
}) => {
  const statusTabs = ["all", "active", "pending", "sold", "draft"];

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All Listings</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="sold">Sold</TabsTrigger>
        <TabsTrigger value="draft">Drafts</TabsTrigger>
      </TabsList>

      {statusTabs.map((status) => (
        <TabsContent key={status} value={status} className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {status === "all" ? (
              listings.length > 0 ? (
                listings.map((listing) => (
                  <CarListingCard
                    key={listing.id}
                    listing={listing}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                  />
                ))
              ) : (
                <EmptyState onAdd={onAdd} />
              )
            ) : (
              // Filtered tabs
              listings.filter(listing => listing.status === status).length > 0 ? (
                listings
                  .filter(listing => listing.status === status)
                  .map((listing) => (
                    <CarListingCard
                      key={listing.id}
                      listing={listing}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onStatusChange={onStatusChange}
                    />
                  ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">No {status.charAt(0).toUpperCase() + status.slice(1)} Listings</h3>
                  <p className="text-gray-500 mb-4">You don't have any {status} car listings at the moment.</p>
                  <Button onClick={onAdd}>Create New Listing</Button>
                </div>
              )
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CarListingTabs;
