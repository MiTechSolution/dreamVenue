import React from "react";
import { services } from "@/Assets/data";
import { FaArrowRight} from "react-icons/fa";

const Services = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-cinzel font-bold text-center mb-16 fade-in">
          <span className="gold-gradient">Our Services</span>
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item, index) => (
            <div key={index} className="fade-in">
              <div className="flex items-start mb-6">
                <div className="text-yellow-400 text-2xl mr-4 mt-1">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-cinzel font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-in">
          <a
            href="booking.html"
            className="gold-button px-8 py-4 rounded-full text-lg font-medium inline-block"
          >
            Book Your Event <FaArrowRight className="inline ml-2" />

                 
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
