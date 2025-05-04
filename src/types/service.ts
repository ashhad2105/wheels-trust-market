
import { ServiceProviderType } from "./serviceProvider";

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  status: string;
  provider: ServiceProviderType;
  image: string;
  rating: number;
}
