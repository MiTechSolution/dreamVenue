

import "@/styles/navbar/Navbar.css";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Hero = dynamic(() => import("@/components/Hero"));
const About = dynamic(() => import("@/components/About"));
const Gallery = dynamic(() => import("@/components/Gallery"), { loading: () => <p>Loading Gallery...</p> });
const Reviews = dynamic(() => import("@/components/Reviews"), { loading: () => <p>Loading Reviews...</p> });
const Footer = dynamic(() => import("@/components/Footer"), { loading: () => <p>Loading Footer...</p> });

export default function Home() {
  return (
    <main>
    <Navbar />
    <Hero />
    <About />
    <Gallery />
    <Reviews />
    <Footer />
  </main>

  );
}

