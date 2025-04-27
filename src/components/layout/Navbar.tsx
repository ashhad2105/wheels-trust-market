
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Car, Menu, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">WheelsTrust</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-800 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/cars"
            className="text-gray-800 hover:text-primary transition-colors"
          >
            Buy/Sell
          </Link>
          <Link
            to="/services"
            className="text-gray-800 hover:text-primary transition-colors"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium">
                {user?.name}
                <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                  {user?.role === "admin"
                    ? "Admin"
                    : user?.role === "service_provider"
                    ? "Service Provider"
                    : "User"}
                </span>
              </div>
              {user?.role === "admin" ? (
                <Link to="/admin-dashboard">
                  <Button size="sm" variant="outline">
                    Dashboard
                  </Button>
                </Link>
              ) : user?.role === "service_provider" ? (
                <Link to="/service-provider-dashboard">
                  <Button size="sm" variant="outline">
                    Dashboard
                  </Button>
                </Link>
              ) : null}
              <Button size="sm" variant="ghost" onClick={logout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={openAuthModal}
                className="text-gray-800 hover:text-primary"
              >
                Login
              </Button>
              <Button
                onClick={openAuthModal}
                size="sm"
                className="button-gradient text-white"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in absolute top-full left-0 w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-800 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="text-gray-800 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Buy/Sell
            </Link>
            <Link
              to="/services"
              className="text-gray-800 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-gray-800 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <hr className="my-2" />
            
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user?.name}</span>
                </div>
                
                {user?.role === "admin" ? (
                  <Link 
                    to="/admin-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full">Dashboard</Button>
                  </Link>
                ) : user?.role === "service_provider" ? (
                  <Link 
                    to="/service-provider-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full">Dashboard</Button>
                  </Link>
                ) : null}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    openAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Login
                </Button>
                <Button 
                  size="sm" 
                  className="button-gradient text-white w-full"
                  onClick={() => {
                    openAuthModal();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
