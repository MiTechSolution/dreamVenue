"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GlowBackground from "@/components/GlowBackground";

const galleryItems = [
  { src: "/images/grand-ballroom.jpeg", alt: "Grand Ballroom" },
  { src: "/images/reception-area.jpeg", alt: "Reception Area" },
  { src: "/images/dining-setup.jpeg", alt: "Dining Setup" },
  { src: "/images/stage-lighting.jpeg", alt: "Stage & Lighting" },
  { src: "/images/outdoor-ceremony.jpg", alt: "Outdoor Ceremony Space" },
  { src: "/images/vip-lounge.jpg", alt: "VIP Lounge" },
];

const Gallery = () => {
  return (

<section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
<GlowBackground position="bottom" color="gold" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-cinzel font-bold text-center mb-16 gold-gradient"
        >
          Our Royal Gallery
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-2xl overflow-hidden group border border-yellow-500/30 shadow-lg"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-all">
                <p className="text-yellow-400 text-lg font-medium">{item.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link href="/full-gallery">
            <button className="gold-button px-8 py-3 rounded-full font-medium text-lg transition-all hover:scale-105">
              See More
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
