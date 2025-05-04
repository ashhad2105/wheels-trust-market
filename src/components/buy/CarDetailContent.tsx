
import React from 'react';
import { Button } from '@/components/ui/button';

interface CarListing {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: "new" | "used" | "certified";
  status: "active" | "sold" | "pending" | "draft";
  images: string[];
  description: string;
  features: string[];
  seller: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

interface CarDetailContentProps {
  car: CarListing;
  onGoBack: () => void;
}

const CarDetailContent: React.FC<CarDetailContentProps> = ({ car, onGoBack }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Car Images */}
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            {car.images && car.images.length > 0 ? (
              <img
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          {car.images && car.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {car.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 rounded overflow-hidden">
                  <img
                    src={image}
                    alt={`${car.make} ${car.model} - ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Car Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{car.make} {car.model}</h1>
            <p className="text-2xl font-semibold text-primary mt-2">
              ${car.price.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Year</p>
              <p className="font-medium">{car.year}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mileage</p>
              <p className="font-medium">{car.mileage.toLocaleString()} miles</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Condition</p>
              <p className="font-medium capitalize">{car.condition}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium capitalize">{car.status}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{car.description}</p>
          </div>

          {car.features && car.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside space-y-1">
                {car.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-2">Seller Information</h2>
            <div className="space-y-1">
              <p className="font-medium">{car.seller.name}</p>
              <p className="text-gray-600">{car.seller.email}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => onGoBack()}>Back to Listings</Button>
            <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailContent;
