"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleBookingClick = () => {
    const user = localStorage.getItem("user");
  
    if (!user) {
      // user login nahi hai → redirectAfterLogin set karo
      localStorage.setItem("redirectAfterLogin", "/booking");
      router.push("/Login");
    } else {
      router.push("/booking");
    }
  };
  

  
  return (
    <section
    id="home"
    className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
  >
    <video
      className="absolute inset-0 w-full h-full object-cover z-0"
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      poster="/images/main.jpg"
    >
      {/* <source src="/videos/wedding-hall.mp4" type="video/mp4" /> */}
    </video>
  
    <div className="absolute inset-0 bg-black/70 z-0"></div>
  
    <div className="container mx-auto px-4 text-center z-10">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-cinzel font-bold mb-6 text-white"
      >
        <span className="text-yellow-400">GrandVenue</span> Hall
      </motion.h1>
  
      <motion.p
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200"
      >
        Where elegance meets excellence. The premier destination for
        unforgettable events.
      </motion.p>
  
      <motion.button
  onClick={handleBookingClick}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  whileHover={{ scale: 1.1 }}
  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full text-lg font-medium inline-block shadow-lg"
>
  Book Your Event <i className="fas fa-arrow-right ml-2"></i>
</motion.button>

    </div>
  
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <a href="#about" className="text-yellow-400 animate-bounce">
        <i className="fas fa-chevron-down text-2xl"></i>
      </a>
    </div>
  </section>
  
  );
};

export default Hero;
