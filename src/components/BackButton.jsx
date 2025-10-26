import React from 'react'
// import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {  FaArrowLeft} from 'react-icons/fa';
import { motion } from 'framer-motion';
const BackButton = () => {
    const router = useRouter();

    const handleBack = () => {
       
        router.push('/');  
    };
  return (
    <motion.button
    onClick={handleBack}
    className="absolute cursor-pointer top-6 left-6 z-50 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-all duration-300 group"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    whileHover={{ x: -5 }}
  >
    <FaArrowLeft className="text-lg group-hover:scale-110 transition-transform" />
    <span className="font-medium">Back</span>
  </motion.button>
  )
}

export default BackButton