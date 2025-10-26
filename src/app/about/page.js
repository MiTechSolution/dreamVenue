'use client';

import CTASection from '@/components/about/CTASection';
import HeroSection from '@/components/about/HeroSection';
import StatisticsSection from '@/components/about/StatisticsSection';
import StorySection from '@/components/about/StorySection';
import TeamSection from '@/components/about/TeamSection';
import TestimonialsSection from '@/components/about/TestimonialsSection';
import ValuesSection from '@/components/about/ValuesSection';
import Vision from '@/components/about/Vision';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
import { motion } from 'framer-motion';

const page = () => {
  return (
    <div className="min-h-screen bg-black">
     
     <Navbar/>
                                              <HeroSection/>         

      {/* <StorySection/> */}


      <StatisticsSection/>

                                                  <Vision/>
      <ValuesSection/>
                           
      
                                                  <CTASection/>
       <TeamSection/>
     
                                          <TestimonialsSection/>
      
       
     <Footer/>
      
      
     
    </div>
  );
};

export default page;