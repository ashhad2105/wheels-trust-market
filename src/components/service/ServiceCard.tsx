
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceType } from "@/types/service";

interface ServiceCardProps {
  service: ServiceType;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img 
          src={service.image || "/placeholder.svg"} 
          alt={service.name} 
          className="w-full h-56 object-cover"
        />
        {service.provider?.verified && (
          <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
        
        <div className="flex items-center mb-3">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm font-medium">{service.rating} </span>
          <span className="text-sm text-gray-500 ml-1">({service.provider?.reviewCount || 0} reviews)</span>
        </div>
        
        {service.provider?.location && (
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            {service.provider.location}
          </div>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{service.description}</p>
        
        {service.provider?.specialties && service.provider.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {service.provider.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {service.provider.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{service.provider.specialties.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="font-medium text-sm">{service.price}</span>
        <Link to={`/services/${service.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
