import React from 'react'
import Image from 'next/image'
import Link from "next/link";


const galleryItems = [
    { src: "/images/gallery/grand-ballroom.jpeg", alt: "Grand Ballroom" },
    { src: "/images/gallery/reception-area.jpeg", alt: "Reception Area" },
    { src: "/images/gallery/dining-setup.jpeg", alt: "Dining Setup" },
    { src: "/images/gallery/stage-lighting.jpeg", alt: "Stage & Lighting" },
    { src: "/images/gallery/outdoor-ceremony.jpg", alt: "Outdoor Ceremony Space" },
    { src: "/images/gallery/vip-lounge.jpg", alt: "VIP Lounge" },
  ];


const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-cinzel font-bold text-center mb-16 fade-in">
          <span className="gold-gradient">Gallery</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden gold-border fade-in"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  placeholder="blur" // optional
                  blurDataURL="/images/placeholder.jpg" // optional
                  priority={index < 3} // preload first 3 images
                />
              </div>
              <div className="p-4 bg-gray-900">
                <p className="text-center text-gray-300">{item.alt}</p>
              </div>
            </div>
          ))}

        </div>

      
      </div>
      <div className="text-center mt-8">
  <Link href="/full-gallery">
    <button className="gold-button px-6 py-2 rounded-full font-medium cursor-pointer">
      See More
    </button>
  </Link>
</div>
    </section>
  )
}

export default Gallery