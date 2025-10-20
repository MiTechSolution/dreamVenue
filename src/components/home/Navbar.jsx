import Link from "next/link";
import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-cinzel font-bold gold-gradient">GrandVenue Hall</Link>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link>
          <Link href="/gallery" className="hover:text-yellow-400 transition-colors">Gallery</Link>
          <Link href="/reviews" className="hover:text-yellow-400 transition-colors">Testimonials</Link>
          <Link href="/Register" className="hover:text-yellow-400 transition-colors">Register</Link>
          <Link href="/adminlogin" className="hover:text-yellow-400 transition-colors">Admin</Link>
          <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
        </div>
        <Link href="/booking" className="gold-button px-6 py-2 rounded-full font-medium">Book Now</Link>
      </div>
    </nav>
  )
}

export default Navbar;
