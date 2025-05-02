
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ServiceForm from "./ServiceForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  category: string;
  status: "active" | "inactive";
}

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    { 
      id: "1", 
      name: "Standard Oil Change", 
      price: "$49.99", 
      duration: "30", 
      description: "Oil change with standard oil, filter replacement and fluid check.",
      category: "maintenance",
      status: "active" 
    },
    { 
      id: "2", 
      name: "Premium Oil Change", 
      price: "$89.99", 
      duration: "45", 
      description: "Oil change with synthetic oil, filter replacement and comprehensive fluid check.",
      category: "maintenance",
      status: "active" 
    },
    { 
      id: "3", 
      name: "Tire Rotation", 
      price: "$60.00", 
      duration: "60", 
      description: "Professional tire rotation to ensure even wear and extend tire life.",
      category: "maintenance",
      status: "active" 
    },
    { 
      id: "4", 
      name: "Brake Pad Replacement", 
      price: "$180.00", 
      duration: "120", 
      description: "Front or rear brake pad replacement with quality parts.",
      category: "repair",
      status: "active" 
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);
  const { toast } = useToast();

  const handleAddService = (newService: Service) => {
    setServices([...services, newService]);
    setIsAddDialogOpen(false);
  };

  const handleEditService = (updatedService: Service) => {
    setServices(services.map(service => 
      service.id === updatedService.id ? updatedService : service
    ));
    setEditService(null);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Service Deleted",
      description: "The service has been deleted successfully."
    });
  };

  const handleToggleStatus = (id: string) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: service.status === "active" ? "inactive" : "active" } 
        : service
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Service Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new service offering for your customers.
              </DialogDescription>
            </DialogHeader>
            <ServiceForm onSubmit={handleAddService} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit service dialog */}
      <Dialog open={!!editService} onOpenChange={(open) => !open && setEditService(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update your service details.
            </DialogDescription>
          </DialogHeader>
          {editService && (
            <ServiceForm 
              initialData={editService} 
              onSubmit={handleEditService} 
              onCancel={() => setEditService(null)} 
              isEdit={true} 
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <Card key={service.id} className={service.status === "inactive" ? "opacity-70" : ""}>
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.category.charAt(0).toUpperCase() + service.category.slice(1)}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setEditService(service)}
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
                          This will permanently delete the service "{service.name}". This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteService(service.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">{service.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">
                    {parseInt(service.duration) < 60 
                      ? `${service.duration} minutes` 
                      : `${Math.floor(parseInt(service.duration) / 60)} hour${parseInt(service.duration) >= 120 ? 's' : ''} ${parseInt(service.duration) % 60 > 0 ? `${parseInt(service.duration) % 60} minutes` : ''}`
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center">
                    <span 
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${service.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                    ></span>
                    <span>{service.status === "active" ? "Active" : "Inactive"}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-2 text-xs h-6"
                      onClick={() => handleToggleStatus(service.id)}
                    >
                      {service.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceManagement;
