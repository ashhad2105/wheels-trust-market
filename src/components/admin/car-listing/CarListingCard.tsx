
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, 
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, 
  AlertDialogCancel } from "@/components/ui/alert-dialog";
import { CarListing } from "../CarListingManagement";

interface CarListingCardProps {
  listing: CarListing;
  onEdit: (listing: CarListing) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: CarListing['status']) => void;
}

const CarListingCard: React.FC<CarListingCardProps> = ({ listing, onEdit, onDelete, onStatusChange }) => {
  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    sold: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    draft: "bg-gray-100 text-gray-800"
  };

  return (
    <Card key={listing.id}>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 h-48 md:h-auto bg-gray-100">
            {listing.images && listing.images.length > 0 ? (
              <img 
                src={listing.images[0]} 
                alt={listing.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="md:w-3/4 p-6">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-semibold">{listing.title}</h3>
              <Badge className={statusColors[listing.status]}>
                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">${Number(listing.price).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mileage</p>
                <p className="font-medium">{Number(listing.mileage).toLocaleString()} mi</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <p className="font-medium">{listing.condition}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{listing.location}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-2">{listing.description}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/cars/details/${listing.id}`}>
                  <Eye className="h-4 w-4 mr-1" /> View
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEdit(listing)}
              >
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive">
                    <Trash className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the listing for "{listing.title}". This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onDelete(listing.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              {listing.status !== "sold" && (
                <Select 
                  value={listing.status} 
                  onValueChange={(value) => onStatusChange(listing.id, value as CarListing['status'])}
                >
                  <SelectTrigger className="h-9 w-32">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarListingCard;
