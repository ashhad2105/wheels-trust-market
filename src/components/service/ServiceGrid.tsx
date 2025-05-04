
import React from "react";
import ServiceCard from "./ServiceCard";
import ServiceFilters from "./ServiceFilters";
import ServiceLoadingState from "./ServiceLoadingState";
import ServiceErrorState from "./ServiceErrorState";
import ServiceEmptyState from "./ServiceEmptyState";
import { useServices } from "./useServices";
import { ServiceType } from "@/types/service";

interface ServiceGridProps {
  services?: ServiceType[];
  isPreview?: boolean;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services: initialServices, isPreview = false }) => {
  const { 
    services, 
    filteredServices, 
    setFilteredServices, 
    isLoading, 
    error, 
    fetchServices 
  } = useServices(initialServices, isPreview);

  if (isLoading) {
    return <ServiceLoadingState />;
  }

  if (error) {
    return <ServiceErrorState error={error} onRetry={fetchServices} />;
  }

  return (
    <div>
      <ServiceFilters services={services} onFilterChange={setFilteredServices} />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      
      {filteredServices.length === 0 && <ServiceEmptyState />}
    </div>
  );
};

export default ServiceGrid;
