'use client';

import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import Image from 'next/image';


const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah & Ahmed",
      event: "Wedding Reception",
      rating: 5,
      text: "GrandVenue made our wedding dreams come true! The attention to detail was incredible.",
      image: "/images/testimonials/couple1.jpg"
    },
    {
      name: "The Khan Family",
      event: "Engagement Ceremony",
      rating: 5,
      text: "Exceptional service from start to finish. Our guests are still talking about the venue!",
      image: "/images/testimonials/couple2.jpg"
    },
    {
      name: "Maria & Bilal",
      event: "Wedding Celebration",
      rating: 5,
      text: "The team went above and beyond to make our day perfect. Truly magical experience!",
      image: "/images/testimonials/couple3.jpg"
    }
  ];

  return (
    <section className="py-20  relative overflow-hidden">
       {/* Background with Parallax Effect */}
      <div className="absolute inset-0">
        <Image
          src="/images/about.jpg"
          alt="Grand Venue Hall"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90"></div>
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6">
            <span className="gold-gradient">Wedding Sections Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hear from couples who celebrated their special moments with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 h-full relative">
                {/* Quote Icon */}
                <div className="text-yellow-400/20 text-6xl absolute top-4 right-4">
                  <FaQuoteLeft />
                </div>

                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-lg mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-yellow-400 text-sm">{testimonial.event}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;