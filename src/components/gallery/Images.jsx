"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaTimes, FaArrowRight, FaArrowLeft, FaExpand } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Default gallery data if no data in localStorage
const defaultGalleryData = [
  {
    id: 1,
    title: "Royal Wedding Celebration",
    description: "A grand wedding ceremony with exquisite decorations and golden theme",
    image: "/images/gallery/wedding-1.jpg",
    category: "wedding"
  },
  {
    id: 2,
    title: "Elegant Engagement Ceremony",
    description: "Intimate engagement ceremony with floral arrangements",
    image: "/images/gallery/engagement-1.jpg",
    category: "engagement"
  },
  {
    id: 3,
    title: "Corporate Gala Night",
    description: "Professional corporate event with sophisticated setup",
    image: "/images/gallery/corporate-1.jpg",
    category: "corporate"
  },
  {
    id: 4,
    title: "Luxury Birthday Bash",
    description: "Grand birthday celebration with theme decorations",
    image: "/images/gallery/birthday-1.jpg",
    category: "birthday"
  },
  {
    id: 5,
    title: "Traditional Wedding Reception",
    description: "Cultural wedding reception with traditional elements",
    image: "/images/gallery/wedding-2.jpg",
    category: "wedding"
  },
  {
    id: 6,
    title: "Modern Engagement Party",
    description: "Contemporary engagement party with minimalist decor",
    image: "/images/gallery/engagement-2.jpg",
    category: "engagement"
  }
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryData, setGalleryData] = useState(defaultGalleryData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const response = await fetch("/api/gallery/get");
        const data = await response.json();
        setGalleryData(Array.isArray(data) && data.length > 0 ? data : defaultGalleryData);
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setGalleryData(defaultGalleryData);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadGalleryData();
  }, []);

  const filteredData =
    filter === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  const visibleData = filteredData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredData.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const showAll = () => {
    setVisibleCount(filteredData.length);
  };

  const nextImage = () => {
    if (filteredData.length === 0) return;
    
    setCurrentIndex((prev) => 
      prev === filteredData.length - 1 ? 0 : prev + 1
    );
    setSelected(filteredData[currentIndex === filteredData.length - 1 ? 0 : currentIndex + 1]);
  };

  const prevImage = () => {
    if (filteredData.length === 0) return;
    
    setCurrentIndex((prev) => 
      prev === 0 ? filteredData.length - 1 : prev - 1
    );
    setSelected(filteredData[currentIndex === 0 ? filteredData.length - 1 : currentIndex - 1]);
  };

  const openLightbox = (item, index) => {
    setSelected(item);
    setCurrentIndex(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selected) return;
      
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setSelected(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, currentIndex, filteredData]);

  const categories = [
    { key: "all", label: "All Events", count: galleryData.length },
    { key: "wedding", label: "Weddings", count: galleryData.filter(item => item.category === "wedding").length },
    { key: "engagement", label: "Engagements", count: galleryData.filter(item => item.category === "engagement").length },
    { key: "reception", label: "Receptions", count: galleryData.filter(item => item.category === "reception").length },
    { key: "corporate", label: "Corporate", count: galleryData.filter(item => item.category === "corporate").length },
    { key: "birthday", label: "Birthdays", count: galleryData.filter(item => item.category === "birthday").length }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-400 text-lg">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-32 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about.jpg"
            alt="Grand Venue Gallery"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-cinzel font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gold-gradient">Our Gallery</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Step into a world of elegance and celebration. Explore our stunning portfolio 
            of unforgettable moments created at GrandVenue Hall.
          </motion.p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setFilter(category.key);
                  setVisibleCount(6);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  filter === category.key
                    ? "gold-button shadow-lg shadow-yellow-500/30"
                    : "bg-gray-800 text-white border border-yellow-500/30 hover:bg-gray-700 hover:border-yellow-400"
                }`}
              >
                <span>{category.label}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  filter === category.key ? "bg-black/20 text-black" : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AnimatePresence>
              {visibleData.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-gray-900/50 backdrop-blur-sm cursor-pointer"
                  onClick={() => openLightbox(item, filteredData.findIndex(img => img.id === item.id))}
                >
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    {/* Use img tag instead of Next Image for dynamic images */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-cinzel font-bold text-yellow-400 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 text-sm font-medium capitalize">
                            {item.category}
                          </span>
                          <div className="text-yellow-400">
                            <FaExpand />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500/90 text-black px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Buttons */}
          {filteredData.length > 0 && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {hasMore ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={loadMore}
                    className="gold-button px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:scale-105 transition-transform"
                  >
                    Load More <FaArrowRight />
                  </button>
                  
                  {filteredData.length > 12 && (
                    <button
                      onClick={showAll}
                      className="border-2 border-yellow-500 text-yellow-400 px-8 py-4 rounded-full font-medium hover:bg-yellow-500/10 transition-all flex items-center gap-3"
                    >
                      Show All ({filteredData.length} Photos)
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-yellow-400 text-lg font-cinzel mb-2">
                    🎉 All Photos Loaded
                  </div>
                  <p className="text-gray-400">
                    You've viewed all {filteredData.length} photos in this category
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Empty State */}
          {filteredData.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-cinzel font-bold text-yellow-400 mb-4">
                No Photos Found
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We're constantly updating our gallery. Check back soon for new photos in this category!
              </p>
              <div className="mt-6">
                <p className="text-gray-500 text-sm">
                  Admin? <a href="/admin/login" className="text-yellow-400 hover:text-yellow-300 underline">Upload images here</a>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-6xl w-full max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-3xl z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all"
                onClick={() => setSelected(null)}
              >
                <FaTimes />
              </button>

              {/* Navigation Arrows */}
              {filteredData.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/50 rounded-full p-4 hover:bg-black/70 transition-all z-10"
                    onClick={prevImage}
                  >
                    <FaArrowLeft />
                  </button>

                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/50 rounded-full p-4 hover:bg-black/70 transition-all z-10"
                    onClick={nextImage}
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}

              {/* Image */}
              <div className="relative h-[70vh] rounded-2xl overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>

              {/* Image Info */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 mt-4 border border-yellow-500/30">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-cinzel font-bold text-yellow-400 mb-2">
                      {selected.title}
                    </h3>
                    <p className="text-gray-300 text-lg mb-3">
                      {selected.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {selected.category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {currentIndex + 1} of {filteredData.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyboard Shortcuts Hint */}
              <div className="text-center mt-4">
                <p className="text-gray-500 text-sm">
                  Use ← → arrow keys to navigate • Esc to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}