
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CarType } from "@/lib/data";
import CarCard from "./CarCard";
import { Search } from "lucide-react";

interface CarGridProps {
  cars: CarType[];
}

const CarGrid: React.FC<CarGridProps> = ({ cars }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedFuelType, setSelectedFuelType] = useState("all");
  const [selectedTransmission, setSelectedTransmission] = useState("all");

  // Get unique values for filters
  const conditions = Array.from(new Set(cars.map((car) => car.condition)));
  const fuelTypes = Array.from(new Set(cars.map((car) => car.fuelType)));
  const transmissions = Array.from(new Set(cars.map((car) => car.transmission)));

  // Filter cars based on selected filters
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCondition =
      selectedCondition === "all" || car.condition === selectedCondition;
    const matchesFuelType =
      selectedFuelType === "all" || car.fuelType === selectedFuelType;
    const matchesTransmission =
      selectedTransmission === "all" || car.transmission === selectedTransmission;

    return matchesSearch && matchesCondition && matchesFuelType && matchesTransmission;
  });

  // Sort cars
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "mileage-low":
        return a.mileage - b.mileage;
      case "mileage-high":
        return b.mileage - a.mileage;
      case "newest":
        return b.year - a.year;
      case "oldest":
        return a.year - b.year;
      default:
        return 0;
    }
  });

  return (
    <div>
      {/* Search and filters */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search by make, model, or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
              <SelectItem value="mileage-low">Mileage (Low to High)</SelectItem>
              <SelectItem value="mileage-high">Mileage (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto">
            <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Fuel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fuel Types</SelectItem>
                {fuelTypes.map((fuelType) => (
                  <SelectItem key={fuelType} value={fuelType}>
                    {fuelType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto">
            <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transmissions</SelectItem>
                {transmissions.map((transmission) => (
                  <SelectItem key={transmission} value={transmission}>
                    {transmission.charAt(0).toUpperCase() + transmission.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            className="ml-auto"
            onClick={() => {
              setSearchQuery("");
              setSortBy("newest");
              setSelectedCondition("all");
              setSelectedFuelType("all");
              setSelectedTransmission("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {sortedCars.length} {sortedCars.length === 1 ? "vehicle" : "vehicles"}
        </p>
      </div>

      {/* Car grid */}
      {sortedCars.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No vehicles found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default CarGrid;
