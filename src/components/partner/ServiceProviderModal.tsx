
import React from "react";
import Modal from "@/components/ui/modal";
import ServiceProviderForm from "./ServiceProviderForm";
import { useAuth } from "@/context/AuthContext";

interface ServiceProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceProviderModal: React.FC<ServiceProviderModalProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, openAuthModal } = useAuth();

  React.useEffect(() => {
    // If the modal is open but user is not authenticated, prompt for login
    if (isOpen && !isAuthenticated) {
      onClose();
      openAuthModal();
    }
  }, [isOpen, isAuthenticated, onClose, openAuthModal]);

  const handleSuccess = () => {
    // Close the modal after successful submission
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen && isAuthenticated}
      onClose={onClose}
      title="Become a Service Partner"
      size="xl"
    >
      <div className="p-4">
        <div className="mb-6">
          <p className="text-gray-600">
            Join our network of trusted service providers and grow your business.
            Fill out the form below to get started. Our team will review your application
            and get back to you within 48 hours.
          </p>
        </div>
        
        <ServiceProviderForm onSuccess={handleSuccess} onCancel={onClose} />
      </div>
    </Modal>
  );
};

export default ServiceProviderModal;
