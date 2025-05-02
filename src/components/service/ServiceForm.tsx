
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ServiceFormProps {
  initialData?: {
    id?: string;
    name: string;
    price: string;
    duration: string;
    description: string;
    category: string;
    status?: "active" | "inactive";
  };
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ 
  initialData = { 
    name: "", 
    price: "", 
    duration: "", 
    description: "", 
    category: "" 
  }, 
  onSubmit, 
  onCancel,
  isEdit = false
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.price || !formData.duration || !formData.category || !formData.description) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        ...formData,
        id: formData.id || Date.now().toString(),
        status: formData.status || "active"
      });
      
      setIsLoading(false);
      
      toast({
        title: isEdit ? "Service Updated" : "Service Created",
        description: isEdit 
          ? "Your service has been updated successfully." 
          : "Your service has been created successfully."
      });
      
      if (!isEdit) {
        // Reset form if it's a new service
        setFormData({ 
          name: "", 
          price: "", 
          duration: "", 
          description: "", 
          category: "" 
        });
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Service Name</label>
          <Input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Brake Inspection"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Price ($)</label>
          <Input 
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 49.99"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Duration</label>
          <Select 
            value={formData.duration} 
            onValueChange={(value) => handleSelectChange("duration", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="90">1.5 hours</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="repair">Repair</SelectItem>
              <SelectItem value="inspection">Inspection</SelectItem>
              <SelectItem value="detailing">Detailing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the service..."
            rows={3}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (isEdit ? 'Update Service' : 'Save Service')}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
