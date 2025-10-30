// components/catering/CateringHero.js
"use client";

import { FaUtensils, FaStar, FaUsers, FaShippingFast } from "react-icons/fa";

const CateringHero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-8">
      <div className="text-center text-white max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient font-cinzel">
          Luxury Catering Services
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Exquisite Cuisine for Your Special Occasions
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <FaUtensils className="text-3xl text-gold mx-auto mb-2" />
            <p className="text-gold font-semibold">100+ Dishes</p>
          </div>
          <div className="text-center">
            <FaStar className="text-3xl text-gold mx-auto mb-2" />
            <p className="text-gold font-semibold">5-Star Quality</p>
          </div>
          <div className="text-center">
            <FaUsers className="text-3xl text-gold mx-auto mb-2" />
            <p className="text-gold font-semibold">500+ Guests</p>
          </div>
          <div className="text-center">
            <FaShippingFast className="text-3xl text-gold mx-auto mb-2" />
            <p className="text-gold font-semibold">Free Delivery</p>
          </div>
        </div>

        <button className="gold-button px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform">
          Order Catering Now
        </button>
      </div>
    </div>
  );
};

export default CateringHero;