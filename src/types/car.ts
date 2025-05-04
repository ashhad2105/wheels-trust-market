
export interface CarType {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: string;
  location: string;
  description: string;
  images: string[];
  image: string;
  seller: string;
  features: string[];
  status: string;
  color: string;
  rating: number;
  reviewCount: number;
  fuelType: string;
  transmission: string;
  sellerType: string; // Making this required to match lib/data.ts
}
