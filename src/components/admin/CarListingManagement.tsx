
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Plus, Edit, Trash, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CarListing {
  _id: string;
  title: string;
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  location: string;
  description: string;
  images: string[];
  seller: {
    _id: string;
    name: string;
  };
  status: "active" | "pending" | "sold" | "inactive";
  createdAt: string;
}

const CarListingManagement = () => {
  const [carListings, setCarListings] = useState<CarListing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCarListings();
  }, []);

  const fetchCarListings = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        setCarListings(response.data.data.cars || []);
      } else {
        setError("Failed to fetch car listings");
        toast({
          title: "Error",
          description: "Failed to fetch car listings",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching car listings:", error);
      setError("Failed to fetch car listings");
      toast({
        title: "Error",
        description: "Failed to fetch car listings. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCarListings = carListings.length > 0 ? carListings.filter(car => {
    const searchLower = searchTerm.toLowerCase();
    return (
      car.make.toLowerCase().includes(searchLower) ||
      car.model.toLowerCase().includes(searchLower) ||
      car.year.toString().includes(searchLower) ||
      car.location.toLowerCase().includes(searchLower)
    );
  }) : [];

  const handleStatusChange = async (carId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars/${carId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setCarListings(prevCars => 
          prevCars.map(car => 
            car._id === carId ? { ...car, status: status as CarListing['status'] } : car
          )
        );
        
        toast({
          title: "Status Updated",
          description: `Car listing status has been updated to ${status}.`,
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to update status",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error updating car status:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCar = async (carId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars/${carId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setCarListings(carListings.filter(car => car._id !== carId));
        
        toast({
          title: "Car Listing Deleted",
          description: "Car listing has been removed successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to delete car listing",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error deleting car listing:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete car listing",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Number(price));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search cars..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to="/cars/sell">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Car Listing
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Listed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-destructive">
                  {error}. <Button variant="link" onClick={fetchCarListings}>Try again</Button>
                </TableCell>
              </TableRow>
            ) : filteredCarListings.length > 0 ? (
              filteredCarListings.map((car) => (
                <TableRow key={car._id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center mr-3 overflow-hidden">
                        {car.images && car.images.length > 0 ? (
                          <img 
                            src={car.images[0]} 
                            alt={`${car.make} ${car.model}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">No image</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{car.year} {car.make} {car.model}</div>
                        <div className="text-sm text-gray-500">{car.mileage} miles</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatPrice(car.price)}</TableCell>
                  <TableCell>{car.condition}</TableCell>
                  <TableCell>{car.location}</TableCell>
                  <TableCell>
                    <Select
                      value={car.status}
                      onValueChange={(value) => handleStatusChange(car._id, value)}
                    >
                      <SelectTrigger className="h-8 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span> Active
                          </span>
                        </SelectItem>
                        <SelectItem value="pending">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span> Pending
                          </span>
                        </SelectItem>
                        <SelectItem value="sold">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span> Sold
                          </span>
                        </SelectItem>
                        <SelectItem value="inactive">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span> Inactive
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{formatDate(car.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/cars/${car._id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/cars/edit/${car._id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Car Listing</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this {car.year} {car.make} {car.model}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCar(car._id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No car listings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CarListingManagement;
