import React, { useState } from "react";
import { ServiceType } from "@/lib/data";
import ServiceCard from "./ServiceCard";
import ServiceFilters from "./ServiceFilters";

interface ServiceGridProps {
  services: ServiceType[];
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  const [filteredServices, setFilteredServices] = useState<ServiceType[]>(services);

  return (
    <div>
      <ServiceFilters services={services} onFilterChange={setFilteredServices} />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      
      {filteredServices.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No services found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceGrid;
