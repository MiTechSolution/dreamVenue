'use client';

import { motion } from 'framer-motion';
import { FaRing, FaHeart, FaGlassCheers, FaCrown } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Loader = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fixed positions for sparkles to avoid hydration mismatch
  const sparklePositions = [
    { left: "10%", top: "20%" },
    { left: "20%", top: "80%" },
    { left: "30%", top: "40%" },
    { left: "40%", top: "60%" },
    { left: "50%", top: "10%" },
    { left: "60%", top: "90%" },
    { left: "70%", top: "30%" },
    { left: "80%", top: "70%" },
    { left: "90%", top: "50%" },
    { left: "15%", top: "45%" },
    { left: "25%", top: "15%" },
    { left: "35%", top: "85%" },
    { left: "45%", top: "25%" },
    { left: "55%", top: "75%" },
    { left: "65%", top: "35%" },
    { left: "75%", top: "65%" },
    { left: "85%", top: "5%" },
    { left: "95%", top: "95%" },
    { left: "5%", top: "55%" },
    { left: "12%", top: "32%" }
  ];

  // Don't render on server to avoid hydration issues
  if (!isClient) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-yellow-400 text-6xl mb-8">
            <FaCrown />
          </div>
          <h2 className="text-3xl md:text-4xl font-cinzel font-bold gold-gradient mb-6">
            GrandVenue Hall
          </h2>
          <div className="w-64 h-1 bg-gray-700 rounded-full mx-auto">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center z-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Hearts */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-yellow-400/20 text-4xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaHeart />
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 right-1/4 text-yellow-400/15 text-3xl"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <FaHeart />
        </motion.div>

        {/* Rotating Rings */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 text-yellow-400/10 text-6xl"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <FaRing />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-1/3 text-yellow-400/10 text-5xl"
          animate={{ rotate: -360 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <FaRing />
        </motion.div>

        {/* Cheers Glasses */}
        <motion.div
          className="absolute top-2/3 left-1/5 text-yellow-400/25 text-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaGlassCheers />
        </motion.div>

        <motion.div
          className="absolute top-2/3 right-1/5 text-yellow-400/25 text-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -5, 5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <FaGlassCheers />
        </motion.div>
      </div>

      {/* Main Loader Content */}
      <div className="text-center relative z-10">
        {/* Crown Icon */}
        <motion.div
          className="text-yellow-400 text-6xl mb-8"
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaCrown />
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-3xl md:text-4xl font-cinzel font-bold gold-gradient mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          GrandVenue Hall
        </motion.h2>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-yellow-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Loading Message */}
        <motion.p
          className="text-gray-400 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Preparing your dream experience...
        </motion.p>
      </div>

      {/* Sparkle Effects with Fixed Positions */}
      <div className="absolute inset-0 pointer-events-none">
        {sparklePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;