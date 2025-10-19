
'use client'

import React, { useState, useEffect } from "react";
import { FaUser, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';


import clientReviews from "../data/user"



const Reviews = () => {

    const [currentIndex , setCurrentIndex] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentIndex((prevIndex) =>
             prevIndex < clientReviews.length -1 ? prevIndex + 1 :0
            );
        },5000);
        return()=> clearInterval(interval);
    }, []);

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : clientReviews.length - 1
        );
      };

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex < clientReviews.length - 1 ? prevIndex +1:0
        );
    };



  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-cinzel font-bold text-center mb-16">
        <span className="gold-gradient">Testimonials</span>
      </h2>

      <div className="max-w-4xl mx-auto relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {clientReviews.map((item, index) => (
            <div
              key={index}
              className="min-w-full p-8 text-center text-gray-300"
            >
              <div className="text-yellow-400 text-5xl mb-6">
              <FaQuoteLeft  className="text-yellow-400"/>
              </div>
              <p className="text-xl italic mb-8">{item.quote}</p>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mr-4">
                <FaUser className="text-yellow-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-cinzel font-semibold text-lg">
                    {item.name}
                  </h4>
                  <p className="text-gray-400">{item.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="text-yellow-400 hover:text-yellow-300 text-2xl"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextTestimonial}
            className="text-yellow-400 hover:text-yellow-300 text-2xl"
          >
             <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Reviews