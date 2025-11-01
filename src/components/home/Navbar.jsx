"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes ,FaBars} from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // check login status when page loads
 
  useEffect(() => {
    // check on mount
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      // or you can check user: const user = localStorage.getItem("user");
      setIsLoggedIn(!!token);
    };
  
    checkLogin();
  
    // listen for changes made in other tabs/windows (and from same tab via storage event)
    const handleStorage = (e) => {
      if (e.key === "token" || e.key === "user") {
        checkLogin();
      }
    };
    window.addEventListener("storage", handleStorage);
  
    // also listen for visibility change / focus (in case same tab changed localStorage)
    const handleFocus = () => {
      checkLogin();
    };
    window.addEventListener("visibilitychange", handleFocus);
    window.addEventListener("focus", handleFocus);
  
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("visibilitychange", handleFocus);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
  


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/Login");
  };

  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-cinzel font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent"
        >
          GrandVenue Hall
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-gray-200 items-center">
          <Link href="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-yellow-400 transition-colors">
            About
          </Link>
          <Link href="/gallery" className="hover:text-yellow-400 transition-colors">
            Gallery
          </Link>
          <Link href="/catering" className="hover:text-yellow-400 transition-colors">
            Catering
          </Link>

          {isLoggedIn && (
            <Link href="/booking" className="hover:text-yellow-400 transition-colors">
              Booking
            </Link>
          )}

          {isLoggedIn && (
            <Link href="/mybookings" className="hover:text-yellow-400 transition-colors">
              MyBooking
            </Link>
          )}

<Link href="/admin/login" className="hover:text-yellow-400 transition-colors">
              Admin
            </Link>




          <Link href="/contact" className="hover:text-yellow-400 transition-colors">
            Contact
          </Link>

          {/* Buttons */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/Login"
                className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all"
              >
                Log In
              </Link>
              <Link 
                href="/Register"
                className="border border-yellow-400 text-yellow-400 px-5 py-2 rounded-full font-medium hover:bg-yellow-400 hover:text-black transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-yellow-400 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes  size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 text-gray-200 backdrop-blur-md flex flex-col items-center space-y-4 py-6"
          >
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellow-400"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellow-400"
            >
              About
            </Link>
            <Link
              href="/gallery"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellow-400"
            >
              Gallery
            </Link>
            {isLoggedIn && (
              <Link
                href="/booking"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-yellow-400"
              >
                Booking
              </Link>
            )}

            {isLoggedIn && (
              <Link
                href="/adminlogin"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-yellow-400"
              >
                Admin
              </Link>
            )}
              {/* <Link
                href="/admin/login"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-yellow-400"
              >
                Admin
              </Link> */}

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellow-400"
            >
              Contact
            </Link>

            {/* Mobile Buttons */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-6 py-2 rounded-full font-medium"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  href="/Login"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-5 py-2 rounded-full font-medium"
                >
                  Log In
                </Link>
                <Link
                  href="/Register"
                  onClick={() => setIsMenuOpen(false)}
                  className="border border-yellow-400 text-yellow-400 px-5 py-2 rounded-full font-medium hover:bg-yellow-400 hover:text-black transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
