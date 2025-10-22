"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // check login status when page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/Login");
  };

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-cinzel font-bold gold-gradient">
          GrandVenue Hall
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-yellow-400 transition-colors">
            About
          </Link>
          <Link href="/gallery" className="hover:text-yellow-400 transition-colors">
            Gallery
          </Link>
          {/* <Link href="/reviews" className="hover:text-yellow-400 transition-colors">
            Testimonials
          </Link> */}
          {isLoggedIn && (
            <Link href="/booking" className="hover:text-yellow-400 transition-colors">
              Booking
            </Link>
          )}
          <Link href="/adminlogin" className="hover:text-yellow-400 transition-colors">
            Admin
          </Link>
          <Link href="/contact" className="hover:text-yellow-400 transition-colors">
            Contact
          </Link>
        </div>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="gold-button px-6 py-2 rounded-full font-medium"
          >
            Logout
          </button>
        ) : (
          <Link href="/Login" className="gold-button px-6 py-2 rounded-full font-medium">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
