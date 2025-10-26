'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHistory, FaRocket, FaCrown } from 'react-icons/fa';

const StorySection = () => {
  const timeline = [
    {
      year: "2002",
      title: "The Beginning",
      description: "GrandVenue started as a dream to create the most luxurious wedding venue in the city.",
      icon: <FaHistory />
    },
    {
      year: "2010",
      title: "First Expansion",
      description: "Expanded our capacity to 500+ guests and introduced premium catering services.",
      icon: <FaRocket />
    },
    {
      year: "2018",
      title: "Luxury Redefined",
      description: "Complete renovation with gold-themed interiors and state-of-the-art facilities.",
      icon: <FaCrown />
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as the premier wedding destination with 1000+ successful events.",
      icon: <FaCrown />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6">
            <span className="gold-gradient">Our Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From humble beginnings to becoming the most sought-after wedding destination, 
            our story is woven with love, dedication, and countless beautiful memories.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300">
                  <div className="text-yellow-400 text-3xl mb-4">{item.icon}</div>
                  <div className="text-yellow-400 text-2xl font-cinzel font-bold mb-2">{item.year}</div>
                  <h3 className="text-2xl font-cinzel font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Center Line */}
              <div className="hidden md:flex flex-col items-center w-12 mx-8">
                <div className="w-1 h-full bg-yellow-500/30 rounded-full"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-2 -mb-2"></div>
              </div>

              {/* Year Marker */}
              <div className="md:w-1/2 text-center md:text-left">
                <div className="text-6xl font-cinzel font-bold text-yellow-400/20">
                  {item.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;