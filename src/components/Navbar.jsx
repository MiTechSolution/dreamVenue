import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm py-4">
    <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-cinzel font-bold gold-gradient">GrandVenue Hall</a>
        <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a>
            <a href="about.html" className="hover:text-yellow-400 transition-colors">About</a>
            <a href="gallery.html" className="hover:text-yellow-400 transition-colors">Gallery</a>
            <a href="#testimonials" className="hover:text-yellow-400 transition-colors">Testimonials</a>
            <a href="Register.html" className="hover:text-yellow-400 transition-colors">ٌRegister</a>
            <a href="Adminlogin.html" className="hover:text-yellow-400 transition-colors">Admin</a>
            <a href="contact.html" className="hover:text-yellow-400 transition-colors">Contact</a>
        </div>
        <a href="booking.html" className="gold-button px-6 py-2 rounded-full font-medium">Book Now</a>
    </div>
</nav>
  )
}

export default Navbar