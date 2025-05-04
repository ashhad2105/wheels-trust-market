
import React from "react";
import CarCard from "./CarCard";
import CarFilters from "./CarFilters";
import CarLoadingState from "./CarLoadingState";
import CarErrorState from "./CarErrorState";
import CarEmptyState from "./CarEmptyState";
import { useCarListings } from "./useCarListings";
import { CarType } from "@/types/car";

interface CarGridProps {
  cars?: CarType[];
  isPreview?: boolean;
}

const CarGrid: React.FC<CarGridProps> = ({ cars: initialCars, isPreview = false }) => {
  const { 
    cars, 
    filteredCars, 
    setFilteredCars, 
    isLoading, 
    error, 
    fetchCars 
  } = useCarListings(initialCars, isPreview);

  if (isLoading) {
    return <CarLoadingState />;
  }

  if (error) {
    return <CarErrorState error={error} onRetry={fetchCars} />;
  }

  return (
    <div>
      <CarFilters cars={cars} onFilterChange={setFilteredCars} />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <CarCard 
            key={car.id} 
            car={car} 
          />
        ))}
      </div>
      
      {filteredCars.length === 0 && <CarEmptyState />}
    </div>
  );
};

export default CarGrid;
