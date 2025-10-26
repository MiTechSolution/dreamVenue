'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef , useEffect,useState} from 'react';
import { FaUsers, FaHeart, FaCalendarCheck, FaAward } from 'react-icons/fa';



const Counter = ({ end, duration = 2, icon, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCountUp(end, duration, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-yellow-400 text-4xl mb-4">{icon}</div>
      <div className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-2">
        {count}+
      </div>
      <div className="text-gray-300 text-lg">{label}</div>
    </motion.div>
  );
};

const useCountUp = (end, duration, start) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (start) {
      let startTime;
      let animationFrame;

      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, start]);

  return count;
};

const StatisticsSection = () => {
  return (
    <>
    <section className="py-20  relative overflow-hidden">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div> */}
     <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-gradient"></div>
 
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6">
            <span className="gold-gradient">By The Numbers</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our journey in numbers - a testament to our commitment to excellence and customer satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <Counter end={1000} icon={<FaCalendarCheck />} label="Events Hosted" />
          <Counter end={50000} icon={<FaUsers />} label="Happy Guests" />
          <Counter end={250} icon={<FaHeart />} label="Weddings" />
          <Counter end={15} icon={<FaAward />} label="Awards Won" />
        </div>
      </div>
    </section>
    </>
  );
};

export default StatisticsSection;