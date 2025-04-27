
// Dummy data for the application

export type CarType = {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  image: string;
  condition: string;
  features: string[];
  sellerType: 'private' | 'dealer';
  transmission: 'automatic' | 'manual';
  fuelType: string;
};

export type ServiceType = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
  provider: ServiceProviderType;
  rating: number;
};

export type ServiceProviderType = {
  id: string;
  name: string;
  rating: number;
  description: string;
  image: string;
  location: string;
  specialties: string[];
  verified: boolean;
};

export type TestimonialType = {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
};

export type FeatureType = {
  title: string;
  description: string;
  icon: string;
};

// Car listings data
export const cars: CarType[] = [
  {
    id: '1',
    title: '2019 Toyota Camry XSE',
    price: 25999,
    year: 2019,
    mileage: 35000,
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop',
    condition: 'Excellent',
    features: ['Leather Seats', 'Bluetooth', 'Backup Camera', 'Sunroof'],
    sellerType: 'dealer',
    transmission: 'automatic',
    fuelType: 'Gasoline',
  },
  {
    id: '2',
    title: '2018 Honda Civic Sport',
    price: 19500,
    year: 2018,
    mileage: 42000,
    location: 'Portland, OR',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    condition: 'Good',
    features: ['Apple CarPlay', 'Android Auto', 'Alloy Wheels', 'Sport Mode'],
    sellerType: 'private',
    transmission: 'manual',
    fuelType: 'Gasoline',
  },
  {
    id: '3',
    title: '2020 Tesla Model 3',
    price: 42990,
    year: 2020,
    mileage: 28000,
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?q=80&w=2070&auto=format&fit=crop',
    condition: 'Excellent',
    features: ['Autopilot', 'Premium Interior', 'Glass Roof', 'Long Range Battery'],
    sellerType: 'dealer',
    transmission: 'automatic',
    fuelType: 'Electric',
  },
  {
    id: '4',
    title: '2017 Ford F-150 XLT',
    price: 29750,
    year: 2017,
    mileage: 56000,
    location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=2070&auto=format&fit=crop',
    condition: 'Good',
    features: ['4x4', 'Tow Package', 'Bed Liner', 'Navigation'],
    sellerType: 'dealer',
    transmission: 'automatic',
    fuelType: 'Gasoline',
  },
  {
    id: '5',
    title: '2021 Mazda CX-5 Touring',
    price: 27800,
    year: 2021,
    mileage: 22000,
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop',
    condition: 'Excellent',
    features: ['AWD', 'Heated Seats', 'Lane Assist', 'Bose Sound System'],
    sellerType: 'dealer',
    transmission: 'automatic',
    fuelType: 'Gasoline',
  },
  {
    id: '6',
    title: '2019 Subaru Outback Limited',
    price: 24990,
    year: 2019,
    mileage: 38500,
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    condition: 'Good',
    features: ['AWD', 'Leather Interior', 'Eyesight System', 'Roof Rails'],
    sellerType: 'private',
    transmission: 'automatic',
    fuelType: 'Gasoline',
  },
];

// Service data
export const services: ServiceType[] = [
  {
    id: '1',
    title: 'Standard Oil Change',
    description: 'Full synthetic oil change with filter replacement and multi-point inspection',
    image: 'https://images.unsplash.com/photo-1630294723485-c69b1e6b2d6c?q=80&w=2070&auto=format&fit=crop',
    price: '$49.99 - $89.99',
    category: 'maintenance',
    provider: serviceProviders[0],
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Brake Pad Replacement',
    description: 'Front or rear brake pad replacement with rotor inspection',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2041&auto=format&fit=crop',
    price: '$180 - $350',
    category: 'repair',
    provider: serviceProviders[1],
    rating: 4.7,
  },
  {
    id: '3',
    title: 'Full Vehicle Inspection',
    description: 'Comprehensive 50-point inspection including all major systems',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1964&auto=format&fit=crop',
    price: '$120 - $180',
    category: 'inspection',
    provider: serviceProviders[2],
    rating: 4.9,
  },
  {
    id: '4',
    title: 'Tire Rotation & Balance',
    description: 'Rotation and balancing of all four tires with pressure check',
    image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=1932&auto=format&fit=crop',
    price: '$60 - $100',
    category: 'maintenance',
    provider: serviceProviders[0],
    rating: 4.6,
  },
];

// Service providers data
export const serviceProviders: ServiceProviderType[] = [
  {
    id: '1',
    name: 'AutoCare Express',
    rating: 4.8,
    description: 'Professional automotive service center with certified mechanics',
    image: 'https://images.unsplash.com/photo-1599256621730-535171e28b8e?q=80&w=1932&auto=format&fit=crop',
    location: 'Multiple locations',
    specialties: ['Maintenance', 'Oil Changes', 'Tires', 'Brakes'],
    verified: true,
  },
  {
    id: '2',
    name: 'Precision Auto Repair',
    rating: 4.7,
    description: 'Family-owned repair shop specializing in domestic and foreign vehicles',
    image: 'https://images.unsplash.com/photo-1599256621730-535171e28b8e?q=80&w=1932&auto=format&fit=crop',
    location: 'Seattle, WA',
    specialties: ['Engine Repair', 'Transmission', 'Electrical Systems'],
    verified: true,
  },
  {
    id: '3',
    name: 'Elite Automotive Services',
    rating: 4.9,
    description: 'Luxury vehicle specialists with dealer-level diagnostic equipment',
    image: 'https://images.unsplash.com/photo-1599256621730-535171e28b8e?q=80&w=1932&auto=format&fit=crop',
    location: 'Los Angeles, CA',
    specialties: ['Luxury Vehicles', 'Performance Tuning', 'Diagnostics'],
    verified: true,
  },
];

// Testimonial data
export const testimonials: TestimonialType[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Car Owner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    content: 'I sold my Toyota through WheelsTrust in less than a week! The process was incredibly smooth, and I got a fair price without the usual hassle.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Car Buyer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    content: 'Finding my dream car was so easy with the detailed listings and transparent pricing. I felt confident in my purchase knowing the vehicle had been verified.',
    rating: 4,
  },
  {
    id: '3',
    name: 'Jessica Rodriguez',
    role: 'Service Provider',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    content: 'As a service provider, the platform has helped my business grow by connecting us with new customers who trust our transparent pricing and service quality.',
    rating: 5,
  },
];

// Features data
export const features: FeatureType[] = [
  {
    title: 'Verified Listings',
    description: 'All vehicles undergo a thorough inspection process to ensure accuracy and quality',
    icon: 'search',
  },
  {
    title: 'Transparent Pricing',
    description: 'Compare market prices and get fair deals with our pricing transparency tools',
    icon: 'info',
  },
  {
    title: 'Trusted Service Network',
    description: 'Connect with vetted service providers rated by our community of car owners',
    icon: 'settings',
  },
  {
    title: 'Secure Transactions',
    description: 'Our secure platform ensures safe transactions between buyers and sellers',
    icon: 'dashboard',
  },
];
