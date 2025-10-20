import Navbar from "@/components/home/Navbar";

import HeroSection from "@/components/about/HeroSection";
import History from "@/components/about/History";
import Footer from "@/components/home/Footer";
import Facilities from "@/components/about/Facilities";
import Services from "@/components/about/Services";




export default function about() {
  return (
    <main>
      <Navbar/>
      <HeroSection/>
      <History/>
      <Facilities/>
      <Services/>
      <Footer/>
      
    </main>
  );
}
