export interface CarType {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  image: string;
  description: string;
  features: string[];
  location: string;
  seller: string;
  rating: number;
  reviewCount: number;
  title?: string;
  condition?: string;
  fuelType?: string;
  transmission?: string;
  sellerType?: 'dealer' | 'private';
}

export interface ServiceType {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
  provider: ServiceProviderType;
  category: string;
  duration: string;
  rating: number;
}

export interface ServiceProviderType {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  description: string;
  verified?: boolean;
}

export const cars: CarType[] = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2021,
    color: "Silver",
    mileage: 34000,
    price: 24500,
    image: "/placeholder.svg",
    description:
      "Reliable and fuel-efficient sedan, perfect for daily commutes.",
    features: ["Automatic", "Bluetooth", "Backup Camera"],
    location: "New York, NY",
    seller: "John Doe",
    rating: 4.5,
    reviewCount: 50,
    title: "Toyota Camry 2021",
    condition: "Excellent",
    fuelType: "Gasoline",
    transmission: "automatic",
    sellerType: "dealer",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2022,
    color: "Blue",
    mileage: 22000,
    price: 22000,
    image: "/placeholder.svg",
    description: "Compact and sporty, great for city driving.",
    features: ["Sunroof", "Alloy Wheels", "Apple CarPlay"],
    location: "Los Angeles, CA",
    seller: "Jane Smith",
    rating: 4.7,
    reviewCount: 75,
    title: "Honda Civic 2022",
    condition: "Excellent",
    fuelType: "Gasoline",
    transmission: "automatic",
    sellerType: "private",
  },
  {
    id: 3,
    make: "Ford",
    model: "F-150",
    year: 2020,
    color: "White",
    mileage: 45000,
    price: 32000,
    image: "/placeholder.svg",
    description: "Powerful and versatile truck, ready for any job.",
    features: ["4x4", "Towing Package", "Crew Cab"],
    location: "Chicago, IL",
    seller: "Mike Johnson",
    rating: 4.3,
    reviewCount: 60,
    title: "Ford F-150 2020",
    condition: "Good",
    fuelType: "Diesel",
    transmission: "manual",
    sellerType: "dealer",
  },
  {
    id: 4,
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    color: "Red",
    mileage: 15000,
    price: 45000,
    image: "/placeholder.svg",
    description: "Electric and eco-friendly, with advanced technology.",
    features: ["Autopilot", "Premium Interior", "Long Range"],
    location: "Houston, TX",
    seller: "Emily Brown",
    rating: 4.9,
    reviewCount: 90,
    title: "Tesla Model 3 2023",
    condition: "Excellent",
    fuelType: "Electric",
    transmission: "automatic",
    sellerType: "dealer",
  },
];

export const features = [
  {
    title: "Extensive Vehicle Database",
    description:
      "Browse through thousands of listings with detailed information and verified history reports.",
    icon: "search",
  },
  {
    title: "Transparent Seller Information",
    description:
      "View seller ratings, reviews, and transaction history for confident buying and selling.",
    icon: "info",
  },
  {
    title: "Advanced Search Filters",
    description:
      "Narrow down your options with precise search filters for make, model, year, price, and more.",
    icon: "settings",
  },
  {
    title: "User-Friendly Dashboard",
    description:
      "Manage your listings, track your favorite vehicles, and communicate with sellers in one central location.",
    icon: "dashboard",
  },
];

export const testimonials = [
  {
    name: "Alice Johnson",
    title: "Happy Car Buyer",
    quote:
      "I found my dream car on WheelsTrust! The transparent seller information and detailed vehicle history gave me the confidence to make a great purchase.",
    image: "/placeholder.svg",
    rating: 5,
  },
  {
    name: "Bob Williams",
    title: "Satisfied Seller",
    quote:
      "Selling my car on WheelsTrust was a breeze. The platform is user-friendly, and I quickly found a buyer at a fair price.",
    image: "/placeholder.svg",
    rating: 4,
  },
  {
    name: "Charlie Brown",
    title: "First Time Car Owner",
    quote:
      "As a first-time car owner, I was nervous about the buying process. WheelsTrust provided all the information and support I needed to make an informed decision.",
    image: "/placeholder.svg",
    rating: 5,
  },
];

export const serviceProviders: ServiceProviderType[] = [
  {
    id: 1,
    name: "Premium Auto Care",
    image: "/placeholder.svg",
    location: "New York, NY",
    rating: 4.9,
    reviewCount: 120,
    specialties: ["Maintenance", "Repairs", "Diagnostics"],
    description:
      "Premium Auto Care offers comprehensive vehicle maintenance and repair services with certified mechanics and state-of-the-art equipment.",
    verified: true,
  },
  {
    id: 2,
    name: "Elite Automotive Solutions",
    image: "/placeholder.svg",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviewCount: 95,
    specialties: ["Performance Upgrades", "Custom Work", "Electrical Systems"],
    description:
      "Specializing in performance enhancements and custom automotive solutions, Elite Automotive provides expert service for enthusiasts and everyday drivers alike.",
    verified: true,
  },
  {
    id: 3,
    name: "Trusty Mechanics",
    image: "/placeholder.svg",
    location: "Chicago, IL",
    rating: 4.7,
    reviewCount: 88,
    specialties: ["Engine Repair", "Transmission Service", "Brake Systems"],
    description:
      "Family-owned business with over 25 years of experience providing honest, reliable mechanical repairs at fair prices.",
    verified: false,
  },
  {
    id: 4,
    name: "Precision Auto Inspection",
    image: "/placeholder.svg",
    location: "Houston, TX",
    rating: 4.9,
    reviewCount: 105,
    specialties: ["Pre-purchase Inspection", "Safety Checks", "Diagnostics"],
    description:
      "Our detailed inspection services help buyers make informed decisions and ensure vehicles are in top condition before purchase.",
    verified: true,
  },
];

export const services: ServiceType[] = [
  {
    id: 1,
    name: "Vehicle Inspection",
    image: "/placeholder.svg",
    description: "Comprehensive pre-purchase inspection with detailed report",
    price: "$149",
    provider: serviceProviders[3],
    category: "Inspection",
    duration: "2 hours",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Regular Maintenance",
    image: "/placeholder.svg",
    description: "Oil change, filter replacement, and safety check",
    price: "$89",
    provider: serviceProviders[0],
    category: "Maintenance",
    duration: "1 hour",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Performance Tuning",
    image: "/placeholder.svg",
    description: "Engine tuning and performance optimization",
    price: "$299",
    provider: serviceProviders[1],
    category: "Performance",
    duration: "3 hours",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Brake System Service",
    image: "/placeholder.svg",
    description: "Complete brake inspection and pad replacement",
    price: "$189",
    provider: serviceProviders[2],
    category: "Repair",
    duration: "2 hours",
    rating: 4.8,
  },
];
