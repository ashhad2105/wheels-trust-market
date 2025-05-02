import React, { useState } from "react";
import { CarType } from "@/lib/data";
import CarCard from "./CarCard";
import CarFilters from "./CarFilters";

interface CarGridProps {
  cars: CarType[];
}

const CarGrid: React.FC<CarGridProps> = ({ cars }) => {
  const [filteredCars, setFilteredCars] = useState<CarType[]>(cars);

  return (
    <div>
      <CarFilters cars={cars} onFilterChange={setFilteredCars} />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      
      {filteredCars.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No cars found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default CarGrid;
