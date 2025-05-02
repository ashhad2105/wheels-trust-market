
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CarType } from "@/lib/data";
import CarCard from "./CarCard";
import { Search, Filter } from "lucide-react";

interface CarGridProps {
  cars: CarType[];
}

const CarGrid: React.FC<CarGridProps> = ({ cars }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedFuelType, setSelectedFuelType] = useState("all");
  const [selectedTransmission, setSelectedTransmission] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  // Calculate min and max price from cars
  const minPrice = Math.min(...cars.map(car => car.price));
  const maxPrice = Math.max(...cars.map(car => car.price));

  // Get unique values for filters
  const conditions = Array.from(new Set(cars.map((car) => car.condition)));
  const fuelTypes = Array.from(new Set(cars.map((car) => car.fuelType)));
  const transmissions = Array.from(new Set(cars.map((car) => car.transmission)));

  // Filter cars based on selected filters
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCondition =
      selectedCondition === "all" || car.condition === selectedCondition;
    
    const matchesFuelType =
      selectedFuelType === "all" || car.fuelType === selectedFuelType;
    
    const matchesTransmission =
      selectedTransmission === "all" || car.transmission === selectedTransmission;
    
    const matchesPriceRange =
      car.price >= priceRange[0] && car.price <= priceRange[1];

    return matchesSearch && matchesCondition && matchesFuelType && matchesTransmission && matchesPriceRange;
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

  const resetFilters = () => {
    setSearchQuery("");
    setSortBy("newest");
    setSelectedCondition("all");
    setSelectedFuelType("all");
    setSelectedTransmission("all");
    setPriceRange([minPrice, maxPrice]);
  };

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
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
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
        </div>
        
        {showFilters && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div>
              <label className="text-sm font-medium mb-1 block">Price Range</label>
              <div className="px-2">
                <Slider 
                  defaultValue={[minPrice, maxPrice]} 
                  min={minPrice} 
                  max={maxPrice} 
                  step={1000}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as number[])}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
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
              
              <div>
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
              
              <div>
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
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
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
