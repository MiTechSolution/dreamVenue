"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCrown,FaHeart, FaRing,FaUsers, FaConciergeBell } from "react-icons/fa";
import GlowBackground from "@/components/GlowBackground";

const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
         <motion.div
          className="absolute bottom-20 left-5 lg:left-20 text-yellow-500/25 text-3xl lg:text-5xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaRing />
        </motion.div>
      {/* Soft Luxury Glow */}
      <GlowBackground position="top" color="gold" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-5xl font-cinzel font-bold mb-6 gold-gradient">
            About GrandVenue Hall
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Welcome to{" "}
            <span className="text-yellow-400 font-semibold">
              GrandVenue Hall
            </span>{" "}
            — where elegance meets celebration. From royal weddings to corporate
            galas, we create unforgettable experiences with our luxurious
            interiors, top-tier services, and golden ambiance.
          </p>
        </motion.div>

        <motion.div
          className="absolute top-20 right-5 lg:right-20 text-yellow-400/30 text-2xl lg:text-4xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaHeart />


         

        </motion.div>
        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <FaCrown />,
              title: "Luxury Design",
              desc: "Exquisite black and gold interiors that define sophistication.",
            },
            {
              icon: <FaUsers />,
              title: "Grand Capacity",
              desc: "From intimate gatherings to lavish events of up to 500 guests.",
            },
            {
              icon: <FaConciergeBell />,
              title: "Premium Services",
              desc: "From event planning to catering — we handle every detail.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.07, rotate: 1 }}
              className="p-8 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-yellow-500/30 shadow-lg hover:shadow-yellow-500/20 transition-all text-center"
            >
              <div className="text-yellow-400 text-5xl mb-5 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-2xl font-cinzel mb-3">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
