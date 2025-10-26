'use client';

import { motion } from 'framer-motion';
import { FaEye,  FaThLarge, FaHandshake } from 'react-icons/fa';
import Image from 'next/image';

const Vision = () => {
  return (
    <section className="py-20  relative overflow-hidden">
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
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaEye className="text-3xl text-black" />
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-yellow-400 mb-4">Our Vision</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              To be the most cherished wedding destination where every celebration becomes 
              an eternal memory, setting new standards of luxury and excellence in event hosting.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              < FaThLarge className="text-3xl text-black" />
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-yellow-400 mb-4">Our Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              To create magical experiences by providing unparalleled service, exquisite venues, 
              and attention to detail that exceeds expectations and celebrates love in its purest form.
            </p>
          </motion.div>

          {/* Promise */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaHandshake className="text-3xl text-black" />
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-yellow-400 mb-4">Our Promise</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Every event is treated with the importance it deserves, ensuring perfection in 
              every detail and creating moments that will be treasured for generations to come.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Vision;