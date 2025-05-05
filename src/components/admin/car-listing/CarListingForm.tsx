
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CarListing } from "../CarListingManagement";

interface CarListingFormProps {
  initialData?: Partial<CarListing>;
  onSave: (data: Partial<CarListing>) => void;
  onCancel: () => void;
}

const CarListingForm: React.FC<CarListingFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<CarListing>>(initialData || {
    year: "",
    make: "",
    model: "",
    price: "",
    mileage: "",
    description: "",
    condition: "Good",
    location: "",
    images: []
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "condition") {
      setFormData({ 
        ...formData, 
        [name]: value as "Excellent" | "Good" | "Fair" | "Poor" 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageAdd = () => {
    // This would normally open a file picker or URL input
    // For demo purposes, we'll just add a placeholder image URL
    const images = formData.images || [];
    setFormData({ 
      ...formData, 
      images: [...images, "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&h=200"] 
    });
    
    toast({
      title: "Image Added",
      description: "Sample image has been added to the listing."
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.year || !formData.make || !formData.model || !formData.price) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Year*</label>
          <Input 
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g. 2021"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Make*</label>
          <Input 
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="e.g. Toyota"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Model*</label>
          <Input 
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g. Camry"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Price ($)*</label>
          <Input 
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 25000"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Mileage</label>
          <Input 
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            placeholder="e.g. 15000"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Condition</label>
          <Select 
            value={formData.condition} 
            onValueChange={(value) => handleSelectChange("condition", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Excellent">Excellent</SelectItem>
              <SelectItem value="Good">Good</SelectItem>
              <SelectItem value="Fair">Fair</SelectItem>
              <SelectItem value="Poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-3 space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input 
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA"
          />
        </div>
        <div className="md:col-span-3 space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the vehicle..."
            rows={3}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Images</label>
          <Button type="button" variant="outline" size="sm" onClick={handleImageAdd}>
            <Plus className="h-4 w-4 mr-1" /> Add Image
          </Button>
        </div>
        {formData.images && formData.images.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {formData.images.map((img, index) => (
              <div key={index} className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden">
                <img src={img} alt={`Car ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No images added yet</p>
        )}
      </div>
      
      <div className="flex gap-2 justify-end pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData?.id ? 'Update Listing' : 'Create Listing'}
        </Button>
      </div>
    </form>
  );
};

export default CarListingForm;
