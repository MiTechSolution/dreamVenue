


import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/home/Navbar"));
const Hero = dynamic(() => import("@/components/home/Hero"));
const About = dynamic(() => import("@/components/home/About"));
const Gallery = dynamic(() => import("@/components/home/Gallery"), { loading: () => <p>Loading Gallery...</p> });
const Reviews = dynamic(() => import("@/components/home/Reviews"), { loading: () => <p>Loading Reviews...</p> });
const Footer = dynamic(() => import("@/components/home/Footer"), { loading: () => <p>Loading Footer...</p> });


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

