"use client";
import React from 'react'

import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* <!-- Background with subtle pattern --> */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMTVjLTguMjggMC0xNSA2LjcyLTE1IDE1czYuNzIgMTUgMTUgMTUgMTUtNi43MiAxNS0xNS02LjcyLTE1LTE1LTE1em0wIDI2Yy02LjA3IDAtMTEtNC45My0xMS0xMXM0LjkzLTExIDExLTExIDExIDQuOTMgMTEgMTEtNC45MyAxMS0xMSAxMXoiIGZpbGw9IiNEMUFFMzciLz48L3N2Zz4=')] z-0"></div>
        
        <div className="container mx-auto px-4 text-center z-10">
            <motion.h1 initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-cinzel font-bold mb-6">

                <span className="gold-gradient">GrandVenue</span> Hall

            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
      
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-300 ">
                Where elegance meets excellence. The premier destination for unforgettable events.
            </motion.p>
            <motion.a href="booking.html"
            
            initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ scale: 1.1 }}
            className="gold-button px-8 py-4 rounded-full text-lg font-medium inline-block " >
                Book Your Event <i className="fas fa-arrow-right ml-2"></i>
            </motion.a>
        </div>
        
        {/* <!-- Scroll indicator --> */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <a href="#about" className="text-yellow-400 animate-bounce">
                <i className="fas fa-chevron-down text-2xl"></i>
            </a>
        </div>
    </section>
  )
}

export default Hero