'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';



const TeamSection = () => {
  const team = [
    {
      name: "Ahmad Khan",
      role: "Founder & CEO",
      image: "/images/team/ceo.jpg",
      description: "With 20+ years in hospitality, Ahmad's vision shapes our luxury standards.",
      social: { instagram: "#", twitter: "#", linkedin: "#" }
    },
    {
      name: "Fatima Ahmed",
      role: "Event Director",
      image: "/images/team/director.jpg",
      description: "Fatima ensures every event exceeds expectations with her meticulous planning.",
      social: { instagram: "#", twitter: "#", linkedin: "#" }
    },
    {
      name: "Zainab Malik",
      role: "Head of Catering",
      image: "/images/team/catering.jpg",
      description: "Zainab's culinary expertise creates unforgettable dining experiences.",
      social: { instagram: "#", twitter: "#", linkedin: "#" }
    },
    {
      name: "Bilal Hassan",
      role: "Venue Manager",
      image: "/images/team/manager.jpg",
      description: "Bilal oversees flawless execution of every event with precision.",
      social: { instagram: "#", twitter: "#", linkedin: "#" }
    }
  ];

  return (
    <section className="py-20  relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/images/silk-fabric.jpg')] bg-cover bg-center opacity-15"></div>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-yellow-900/30 to-black/90"></div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6">
            <span className="gold-gradient">Meet Our Family</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The passionate team behind GrandVenue, dedicated to making your special day perfect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300">
                {/* Team Member Image */}
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <div className="w-full h-full bg-gradient-to-br from-yellow-600/20 to-black/80 flex items-center justify-center">
                    <div className="text-center text-yellow-400">
                      <div className="text-6xl mb-4">👑</div>
                      <div className="text-lg font-cinzel">{member.name}</div>
                    </div>
                  </div>
                </div>

                {/* Team Member Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-cinzel font-semibold text-white mb-2">
                    {member.name}
                  </h3>
                  <div className="text-yellow-400 font-medium mb-3">{member.role}</div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {Object.entries(member.social).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={link}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        {platform === 'instagram' && <FaInstagram />}
                        {platform === 'twitter' && <FaTwitter />}
                        {platform === 'linkedin' && <FaLinkedin />}
                      </a>
                    ))}
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

export default TeamSection;