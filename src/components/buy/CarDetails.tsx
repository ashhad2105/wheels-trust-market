
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFetchCarDetail } from './useFetchCarDetail';
import CarDetailContent from './CarDetailContent';

const CarDetails = () => {
  const { car, isLoading, error, navigate } = useFetchCarDetail();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-destructive">{error || "Car not found"}</p>
        <Button onClick={() => navigate('/buy')}>Back to Listings</Button>
      </div>
    );
  }

  return <CarDetailContent car={car} onGoBack={() => navigate('/buy')} />;
};

export default CarDetails;
