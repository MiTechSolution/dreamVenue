// components/catering/CateringDeals.js
"use client";

import { FaCheck, FaUtensils, FaCrown, FaGem, FaStar } from "react-icons/fa";

const CateringDeals = () => {
  const deals = [
    {
      id: 1,
      name: "Basic Package",
      price: "₹15,000",
      icon: FaUtensils,
      features: [
        "3 Main Course Dishes",
        "2 Appetizers",
        "1 Dessert",
        "Soft Drinks",
        "Serves 50 People",
        "Basic Serving Staff"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Silver Package",
      price: "₹25,000",
      icon: FaStar,
      features: [
        "5 Main Course Dishes",
        "4 Appetizers",
        "2 Desserts",
        "Juices & Soft Drinks",
        "Serves 100 People",
        "Professional Serving Staff",
        "Basic Decorations"
      ],
      popular: false
    },
    {
      id: 3,
      name: "Gold Package",
      price: "₹40,000",
      icon: FaCrown,
      features: [
        "7 Main Course Dishes",
        "6 Appetizers",
        "3 Desserts",
        "Premium Beverages",
        "Serves 150 People",
        "Expert Serving Staff",
        "Elegant Decorations",
        "Live Cooking Station"
      ],
      popular: true
    },
    {
      id: 4,
      name: "Platinum Package",
      price: "₹65,000",
      icon: FaGem,
      features: [
        "10 Main Course Dishes",
        "8 Appetizers",
        "5 Desserts",
        "Premium Bar Services",
        "Serves 200+ People",
        "Dedicated Event Manager",
        "Luxury Decorations",
        "Multiple Live Counters",
        "VIP Service"
      ],
      popular: false
    }
  ];

  return (
    <div className="py-16 bg-black px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4 font-cinzel">
          Catering Packages
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Choose from our carefully curated packages designed for every occasion and budget
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className={`bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 border-2 ${
                deal.popular 
                  ? 'border-gold shadow-2xl shadow-gold/20 transform scale-105' 
                  : 'border-gray-700'
              } transition-all duration-300 hover:shadow-lg hover:shadow-gold/10`}
            >
              {deal.popular && (
                <div className="bg-gold text-black text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <deal.icon className="text-3xl text-gold mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white mb-2">{deal.name}</h3>
                <div className="text-3xl font-bold text-gold mb-2">{deal.price}</div>
                <p className="text-gray-400 text-sm">Starting Price</p>
              </div>

              <ul className="space-y-3 mb-6">
                {deal.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <FaCheck className="text-gold mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full gold-button py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CateringDeals;