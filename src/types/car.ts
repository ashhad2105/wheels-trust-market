
export interface CarType {
  id: string | number;
  title: string;
  make: string;
  model: string;
  year: number | string;
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
  sellerType?: string;
}
