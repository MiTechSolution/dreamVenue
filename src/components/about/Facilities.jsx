'use client'

import React from "react";
import { facilities } from "@/Assets/data";

const Facilities = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-cinzel font-bold text-center mb-16 fade-in">
          <span className="gold-gradient">Our Facilities</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {facilities.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gray-900/50 gold-border fade-in"
            >
              <div className="text-yellow-400 text-4xl mb-4">
               {item.icon}
              </div>
              <h3 className="text-xl font-cinzel font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
