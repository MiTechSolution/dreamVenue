"use client";
import { useState } from "react";
import Image from "next/image";
import { galleryData } from "@/Assets/data";
import { FaTimes } from "react-icons/fa";

export default function Images() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filteredData =
    filter === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-cinzel font-bold mb-8 gold-gradient">
          Our Gallery
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-12">
          Explore the elegance and sophistication of GrandVenue Hall through our
          stunning event portfolio
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "wedding", "corporate", "birthday", "other"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === cat
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-black"
                  : "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
              }`}
            >
              {cat === "all"
                ? "All Events"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="rounded-lg overflow-hidden border border-yellow-400 cursor-pointer transform hover:scale-105 transition-all relative group"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className="object-cover w-full h-80"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-center items-center">
                <h3 className="text-2xl font-cinzel font-bold text-yellow-400 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-center px-4">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div className="max-w-4xl relative p-4">
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={() => setSelected(null)}
            >
              <FaTimes />
            </button>
            <Image
              src={selected.image}
              alt={selected.title}
              width={900}
              height={600}
              className="rounded-lg object-contain mx-auto"
            />
            <h3 className="text-3xl font-cinzel font-bold text-yellow-400 mt-6 text-center">
              {selected.title}
            </h3>
            <p className="text-gray-300 text-center mt-2">
              {selected.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
