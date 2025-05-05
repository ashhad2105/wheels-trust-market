<<<<<<< HEAD
=======

>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
<<<<<<< HEAD
import { Search, Plus, Edit, Trash, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
=======
import { Search, Plus, Edit, Trash, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Link } from "react-router-dom";
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62

interface ServiceProvider {
  _id: string;
  name: string;
<<<<<<< HEAD
  email: string;
  phone: string;
  status: "active" | "pending" | "inactive";
  services: string[];
  rating: number;
  reviewCount: number;
  address: {
    street: string;
=======
  description: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  location: {
    address: string;
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
    city: string;
    state: string;
    zipCode: string;
  };
<<<<<<< HEAD
  createdAt: string;
}

const serviceProviderFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
  }),
});

const ServiceProviderManagement = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editProvider, setEditProvider] = useState<ServiceProvider | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof serviceProviderFormSchema>>({
    resolver: zodResolver(serviceProviderFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
=======
  phone: string;
  email: string;
  verified: boolean;
  status: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

const ServiceProviderManagement = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchServiceProviders();
  }, []);

  const fetchServiceProviders = async () => {
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }
<<<<<<< HEAD

=======
      
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/service-providers`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
<<<<<<< HEAD

      if (response.data.success) {
        setProviders(response.data.data);
=======
      
      if (response.data.success) {
        setProviders(response.data.data.serviceProviders || []);
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
      } else {
        setError("Failed to fetch service providers");
        toast({
          title: "Error",
          description: "Failed to fetch service providers",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching service providers:", error);
      setError("Failed to fetch service providers");
      toast({
        title: "Error",
        description: "Failed to fetch service providers. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  const handleAddProvider = async (data: z.infer<typeof serviceProviderFormSchema>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/service-providers`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setProviders([...providers, response.data.data]);
        setIsAddDialogOpen(false);
        form.reset();
        toast({
          title: "Success",
          description: "Service provider added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding service provider:", error);
      toast({
        title: "Error",
        description: "Failed to add service provider. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleEditProvider = async (data: z.infer<typeof serviceProviderFormSchema>) => {
    if (!editProvider) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/service-providers/${editProvider._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setProviders(providers.map(provider => 
          provider._id === editProvider._id ? response.data.data : provider
        ));
        setEditProvider(null);
        form.reset();
        toast({
          title: "Success",
          description: "Service provider updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating service provider:", error);
      toast({
        title: "Error",
        description: "Failed to update service provider. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProvider = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/service-providers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setProviders(providers.filter(provider => provider._id !== id));
        toast({
          title: "Success",
          description: "Service provider deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting service provider:", error);
      toast({
        title: "Error",
        description: "Failed to delete service provider. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProviderStatus = async (id: string, status: "active" | "pending" | "inactive") => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/service-providers/${id}/status`,
=======
  const filteredProviders = providers.length > 0 ? providers.filter(provider => {
    const searchLower = searchTerm.toLowerCase();
    return (
      provider.name.toLowerCase().includes(searchLower) ||
      provider.email.toLowerCase().includes(searchLower) ||
      (provider.specialties && provider.specialties.some(specialty => specialty.toLowerCase().includes(searchLower)))
    );
  }) : [];

  const handleProviderStatusChange = async (providerId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/service-providers/${providerId}/status`,
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
<<<<<<< HEAD
        setProviders(providers.map(provider => 
          provider._id === id ? { ...provider, status } : provider
        ));
        toast({
          title: "Success",
          description: "Service provider status updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating service provider status:", error);
      toast({
        title: "Error",
        description: "Failed to update service provider status. Please try again later.",
=======
        setProviders(prevProviders => 
          prevProviders.map(provider => 
            provider._id === providerId ? { ...provider, status } : provider
          )
        );
        
        toast({
          title: "Status Updated",
          description: `Service provider status has been updated to ${status}.`,
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to update status",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error updating provider status:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update status",
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
        variant: "destructive",
      });
    }
  };

<<<<<<< HEAD
  const filteredProviders = providers.filter(provider => {
    const searchLower = searchTerm.toLowerCase();
    return (
      provider.name.toLowerCase().includes(searchLower) ||
      provider.email.toLowerCase().includes(searchLower) ||
      provider.phone.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
=======
  const handleVerificationChange = async (providerId: string, isVerified: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/service-providers/${providerId}/verify`,
        { isVerified },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setProviders(prevProviders => 
          prevProviders.map(provider => 
            provider._id === providerId ? { ...provider, verified: isVerified } : provider
          )
        );
        
        toast({
          title: "Verification Updated",
          description: `Service provider is now ${isVerified ? 'verified' : 'unverified'}.`,
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to update verification status",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error updating provider verification:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update verification status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProvider = async (providerId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/service-providers/${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setProviders(providers.filter(provider => provider._id !== providerId));
        
        toast({
          title: "Provider Deleted",
          description: "Service provider has been removed successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to delete service provider",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error deleting service provider:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete service provider",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
  };

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search providers..."
            className="pl-8"
=======
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search providers..." 
            className="pl-10"
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
<<<<<<< HEAD
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Provider
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Service Provider</DialogTitle>
              <DialogDescription>
                Create a new service provider account with the following details.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddProvider)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Address</h4>
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter zip code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Provider</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
=======
        <Link to="/service-provider/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Provider
          </Button>
        </Link>
      </div>
      
      <div className="rounded-md border overflow-hidden">
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
<<<<<<< HEAD
              <TableHead>Contact</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
=======
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verification</TableHead>
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-destructive">
<<<<<<< HEAD
                  {error}. <Button variant="link" onClick={fetchProviders}>Try again</Button>
=======
                  {error}. <Button variant="link" onClick={fetchServiceProviders}>Try again</Button>
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                </TableCell>
              </TableRow>
            ) : filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <TableRow key={provider._id}>
<<<<<<< HEAD
                  <TableCell>
=======
                  <TableCell className="py-4">
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        {provider.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{provider.name}</div>
<<<<<<< HEAD
                        <div className="text-sm text-gray-500">
                          {provider.services.length} services
                        </div>
=======
                        <div className="text-sm text-gray-500">{provider.email}</div>
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
<<<<<<< HEAD
                    <div>{provider.email}</div>
                    <div className="text-sm text-gray-500">{provider.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      {provider.rating.toFixed(1)}
                      <span className="text-gray-500 ml-1">
                        ({provider.reviewCount} reviews)
=======
                    {provider.location ? 
                      `${provider.location.city}, ${provider.location.state}` : 
                      "Location not specified"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-1">{provider.rating || 0}</span>
                      <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="text-xs text-gray-500 ml-1">
                        ({provider.reviewCount || 0} reviews)
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select 
<<<<<<< HEAD
                      defaultValue={provider.status} 
                      onValueChange={(value: "active" | "pending" | "inactive") => handleUpdateProviderStatus(provider._id, value)}
=======
                      value={provider.status || 'pending'} 
                      onValueChange={(value) => handleProviderStatusChange(provider._id, value)}
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
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
                        <SelectItem value="inactive" className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          Inactive
                        </SelectItem>
<<<<<<< HEAD
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{formatDate(provider.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditProvider(provider);
                          form.reset({
                            name: provider.name,
                            email: provider.email,
                            phone: provider.phone,
                            address: provider.address,
                          });
                        }}
                      >
                        <Edit className="h-4 w-4" />
=======
                        <SelectItem value="suspended" className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          Suspended
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={provider.verified ? "verified" : "unverified"} 
                      onValueChange={(value) => handleVerificationChange(provider._id, value === "verified")}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verified" className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Verified
                        </SelectItem>
                        <SelectItem value="unverified" className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          Unverified
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/services/${provider._id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/service-provider/edit/${provider._id}`}>
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
                              This will permanently delete the service provider "{provider.name}". This action cannot be undone.
=======
                            <AlertDialogTitle>Delete Service Provider</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {provider.name}? This action cannot be undone.
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
<<<<<<< HEAD
                            <AlertDialogAction 
=======
                            <AlertDialogAction
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                              onClick={() => handleDeleteProvider(provider._id)}
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
                  No service providers found
=======
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No service providers found.
>>>>>>> 9709ca785318f820761c0b59825f07758c76ba62
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
<<<<<<< HEAD

      {/* Edit Provider Dialog */}
      <Dialog open={!!editProvider} onOpenChange={(open) => !open && setEditProvider(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Service Provider</DialogTitle>
            <DialogDescription>
              Update service provider details below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditProvider)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Address</h4>
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter zip code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditProvider(null)}>
                  Cancel
                </Button>
                <Button type="submit">Update Provider</Button>
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

export default ServiceProviderManagement;
