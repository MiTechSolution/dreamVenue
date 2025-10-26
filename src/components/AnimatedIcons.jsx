import React from 'react'


import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaCrown, FaHeart, FaRing, FaArrowLeft, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const AnimatedIcons = () => {
  return (
    
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-5 lg:left-10 text-yellow-500/20 text-4xl lg:text-6xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <FaCrown />
        </motion.div>
        <motion.div
          className="absolute top-20 right-5 lg:right-20 text-yellow-400/30 text-2xl lg:text-4xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaHeart />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-5 lg:left-20 text-yellow-500/25 text-3xl lg:text-5xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaRing />
        </motion.div>
        </div>
    
  )
}

export default AnimatedIcons