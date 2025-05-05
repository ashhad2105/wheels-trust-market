<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Plus, Edit, Trash, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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

const carListingFormSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1900, "Year must be at least 1900").max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  price: z.number().min(0, "Price must be positive"),
  mileage: z.number().min(0, "Mileage must be positive"),
  condition: z.enum(["new", "used", "certified"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
});

const CarListingManagement = () => {
  const [listings, setListings] = useState<CarListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editListing, setEditListing] = useState<CarListing | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof carListingFormSchema>>({
    resolver: zodResolver(carListingFormSchema),
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      condition: "used",
      description: "",
      features: [],
    },
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setIsLoading(true);
=======

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
    setError(null);
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

<<<<<<< HEAD
      console.log('Fetching car listings from:', `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars`);
      
      const response = await axios.get<{ 
        success: boolean; 
        data: {
          cars: CarListing[];
          pagination: {
            total: number;
            pages: number;
            currentPage: number;
            limit: number;
          }
        }
      }>(
=======
      const response = await axios.get(
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
<<<<<<< HEAD

      console.log('API Response:', response.data);

      if (response.data.success && Array.isArray(response.data.data.cars)) {
        setListings(response.data.data.cars);
      } else {
        console.error('Invalid response format:', response.data);
        setError("Failed to fetch car listings");
        setListings([]);
=======
      
      console.log("Car listings response:", response.data);
      
      if (response.data.success) {
        // Check if data.cars exists (for pagination structure) or use data directly
        const cars = response.data.data.cars || response.data.data || [];
        setCarListings(cars);
        
        if (cars.length === 0) {
          console.log("No car listings found in response");
        }
      } else {
        setError("Failed to fetch car listings");
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
        toast({
          title: "Error",
          description: "Failed to fetch car listings",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching car listings:", error);
      setError("Failed to fetch car listings");
<<<<<<< HEAD
      setListings([]);
=======
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
      toast({
        title: "Error",
        description: "Failed to fetch car listings. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  const handleAddListing = async (data: z.infer<typeof carListingFormSchema>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/car-listings`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setListings([...listings, response.data.data]);
        setIsAddDialogOpen(false);
        form.reset();
        toast({
          title: "Success",
          description: "Car listing added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding car listing:", error);
      toast({
        title: "Error",
        description: "Failed to add car listing. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleEditListing = async (data: z.infer<typeof carListingFormSchema>) => {
    if (!editListing) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars/${editListing._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setListings(listings.map(listing => 
          listing._id === editListing._id ? response.data.data : listing
        ));
        setEditListing(null);
        form.reset();
        toast({
          title: "Success",
          description: "Car listing updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating car listing:", error);
      toast({
        title: "Error",
        description: "Failed to update car listing. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteListing = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setListings(listings.filter(listing => listing._id !== id));
        toast({
          title: "Success",
          description: "Car listing deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting car listing:", error);
      toast({
        title: "Error",
        description: "Failed to delete car listing. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateListingStatus = async (id: string, status: "active" | "sold" | "pending" | "draft") => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

      console.log('Updating car status:', { id, status });
      
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars/${id}/status`,
        { 
          status,
          id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
=======
  const filteredCarListings = carListings.filter(car => {
    if (!car) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      car.make?.toLowerCase().includes(searchLower) ||
      car.model?.toLowerCase().includes(searchLower) ||
      car.year?.toString().includes(searchLower) ||
      car.location?.toLowerCase().includes(searchLower)
    );
  });

  const handleStatusChange = async (carId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/cars/${carId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
          }
        }
      );

<<<<<<< HEAD
      console.log('Status update response:', response.data);

      if (response.data.success) {
        setListings(prevListings => 
          prevListings.map(listing => 
            listing._id === id ? { ...listing, status } : listing
          )
        );
        toast({
          title: "Success",
          description: "Car listing status updated successfully",
        });
      } else {
        console.error('Failed to update status:', response.data);
        toast({
          title: "Error",
          description: response.data.error || "Failed to update car listing status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating car listing status:", error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        
        // Log the full error response
        if (error.response?.data) {
          console.error('Server error response:', error.response.data);
        }
      }
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update car listing status. Please try again later.",
=======
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
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
        variant: "destructive",
      });
    }
  };

<<<<<<< HEAD
  const filteredListings = Array.isArray(listings) ? listings.filter(listing => {
    const searchLower = searchTerm.toLowerCase();
    return (
      listing.make.toLowerCase().includes(searchLower) ||
      listing.model.toLowerCase().includes(searchLower) ||
      listing.seller.name.toLowerCase().includes(searchLower)
    );
  }) : [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
=======
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
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString();
  };

  const formatPrice = (price: string) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Number(price));
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
<<<<<<< HEAD
            placeholder="Search listings..."
=======
            placeholder="Search cars..."
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
<<<<<<< HEAD
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Listing
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Car Listing</DialogTitle>
              <DialogDescription>
                Create a new car listing with the following details.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddListing)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter make" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter model" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter year" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter price" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mileage</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter mileage" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="used">Used</SelectItem>
                            <SelectItem value="certified">Certified</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Listing</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
=======
        <Link to="/cars/sell">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Car Listing
          </Button>
        </Link>
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
<<<<<<< HEAD
              <TableHead>Seller</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Posted</TableHead>
=======
              <TableHead>Price</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Listed</TableHead>
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
<<<<<<< HEAD
                <TableCell colSpan={6} className="text-center py-10">
=======
                <TableCell colSpan={7} className="text-center py-10">
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
<<<<<<< HEAD
                <TableCell colSpan={6} className="text-center py-8 text-destructive">
                  {error}. <Button variant="link" onClick={fetchListings}>Try again</Button>
                </TableCell>
              </TableRow>
            ) : filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <TableRow key={listing._id}>
                  <TableCell>
                    <div className="flex items-center">
                      {listing.images && listing.images.length > 0 ? (
                        <img
                          src={listing.images[0]}
                          alt={`${listing.make} ${listing.model}`}
                          className="h-10 w-10 object-cover rounded mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center mr-3">
                          <span className="text-gray-500 text-xs">No image</span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{listing.make} {listing.model}</div>
                        <div className="text-sm text-gray-500">
                          {listing.year} • {listing.mileage.toLocaleString()} miles
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{listing.seller.name}</div>
                    <div className="text-sm text-gray-500">{listing.seller.email}</div>
                  </TableCell>
                  <TableCell>{formatPrice(listing.price)}</TableCell>
                  <TableCell>
                    <Select 
                      defaultValue={listing.status} 
                      onValueChange={(value: "active" | "sold" | "pending" | "draft") => handleUpdateListingStatus(listing._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active" className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Active
                        </SelectItem>
                        <SelectItem value="pending" className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          Pending
                        </SelectItem>
                        <SelectItem value="sold" className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          Sold
=======
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
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
<<<<<<< HEAD
                  <TableCell>{formatDate(listing.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditListing(listing);
                          form.reset({
                            make: listing.make,
                            model: listing.model,
                            year: listing.year,
                            price: listing.price,
                            mileage: listing.mileage,
                            condition: listing.condition,
                            description: listing.description,
                            features: listing.features,
                          });
                        }}
                      >
                        <Edit className="h-4 w-4" />
=======
                  <TableCell>{formatDate(car.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/cars/details/${car._id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/cars/edit/${car._id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
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
<<<<<<< HEAD
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the car listing for "{listing.make} {listing.model}". This action cannot be undone.
=======
                            <AlertDialogTitle>Delete Car Listing</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this {car.year} {car.make} {car.model}? This action cannot be undone.
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
<<<<<<< HEAD
                            <AlertDialogAction 
                              onClick={() => handleDeleteListing(listing._id)}
=======
                            <AlertDialogAction
                              onClick={() => handleDeleteCar(car._id)}
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
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
<<<<<<< HEAD
                <TableCell colSpan={6} className="text-center py-8">
                  No car listings found
=======
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No car listings found.
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
<<<<<<< HEAD

      {/* Edit Listing Dialog */}
      <Dialog open={!!editListing} onOpenChange={(open) => !open && setEditListing(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Car Listing</DialogTitle>
            <DialogDescription>
              Update car listing details below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditListing)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Make</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter make" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter model" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter year" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter price" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="mileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mileage</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter mileage" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                          <SelectItem value="certified">Certified</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditListing(null)}>
                  Cancel
                </Button>
                <Button type="submit">Update Listing</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
=======
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
    </div>
  );
};

export default CarListingManagement;
