'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight, FaCalendarCheck, FaPhone } from 'react-icons/fa';
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20  relative overflow-hidden">
     {/* Grand Hall Interior */}
  <div className="absolute inset-0 ">
    <Image
      src="/images/about.jpg"
      alt="Grand Hall Interior"
      fill
      className="object-cover scale-110"
    />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90"></div>
    
    {/* Vibrant Gradient */}
    {/* <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-purple-600/30 to-yellow-400/20"></div> */}
    {/* Dark Edges */}
    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"></div> */}
  </div>



      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 text-yellow-400/10 text-8xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <FaCalendarCheck />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-yellow-400/10 text-6xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaPhone />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold mb-6">
            <span className="gold-gradient">Ready to Create Magic?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Let's work together to create the wedding of your dreams. Your perfect day awaits at GrandVenue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gold-button px-8 py-4 rounded-full text-lg font-medium flex items-center gap-3"
            >
               Book Your Event <FaArrowRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-yellow-500 text-yellow-400 px-8 py-4 rounded-full text-lg font-medium hover:bg-yellow-500/10 transition-all flex items-center gap-3"
            >
              <FaPhone /> Contact Us
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 mt-8 text-lg"
          >
            ✨ Where dreams become beautiful realities ✨
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;