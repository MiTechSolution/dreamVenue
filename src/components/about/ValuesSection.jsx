'use client';

import { motion } from 'framer-motion';
import { FaStar, FaShieldAlt, FaHeart, FaMagic, FaUsers, FaCrown } from 'react-icons/fa';



const ValuesSection = () => {
  const values = [
    {
      icon: <FaStar />,
      title: "Excellence",
      description: "We strive for perfection in every detail, ensuring unparalleled quality."
    },
    {
      icon: <FaShieldAlt />,
      title: "Trust",
      description: "Building lasting relationships based on reliability and integrity."
    },
    {
      icon: <FaHeart />,
      title: "Passion",
      description: "Driven by love for creating beautiful memories and celebrations."
    },
    {
      icon: <FaMagic />,
      title: "Creativity",
      description: "Innovative approaches to make each event unique and memorable."
    },
    {
      icon: <FaUsers />,
      title: "Collaboration",
      description: "Working closely with clients to bring their vision to life."
    },
    {
      icon: <FaCrown />,
      title: "Luxury",
      description: "Providing premium experiences that exceed expectations."
    }
  ];

  return (
    <section className="py-20  relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/images/geometric-gold.png')] bg-repeat opacity-10"></div>
  {/* Color Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
  

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6">
            <span className="gold-gradient">Our Values</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The principles that guide us in delivering exceptional experiences and building lasting relationships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 h-full">
                <div className="text-yellow-400 text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-cinzel font-semibold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;