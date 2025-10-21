import { 
  FaSnowflake, 
  FaParking, 
  FaUtensils, 
  FaMusic, 
  FaPalette, 
  FaWifi ,
  FaCheckCircle,
   FaArrowRight
} from "react-icons/fa";


// Reviews

export const clientReviews = [
  {
    quote: "Our wedding at GrandVenue Hall was absolutely magical...",
    name: "Sarah & Michael",
    event: "Wedding Celebration",
  },
  {
    quote: "We hosted our annual corporate gala...",
    name: "James Richardson",
    event: "Corporate Event",
  },
  {
    quote: "From the initial planning to the execution...",
    name: "The Johnson Family",
    event: "50th Anniversary",
  },
];
// about 
export const facilities = [
  {
    title: "Climate Control",
    description:
      "State-of-the-art air conditioning and heating systems for year-round comfort.",
    icon: <FaSnowflake />,
  },
  {
    title: "Valet Parking",
    description:
      "Complimentary valet parking for up to 200 vehicles with secure overnight options.",
    icon: <FaParking />,
  },
  {
    title: "In-House Catering",
    description:
      "Award-winning culinary team offering diverse menus from casual to fine dining.",
    icon: <FaUtensils />,
  },
  {
    title: "Audio-Visual Systems",
    description:
      "Professional sound, lighting, and projection systems for presentations and entertainment.",
    icon: <FaMusic />,
  },
  {
    title: "Custom Decor",
    description:
      "Expert decorators to transform the space according to your theme and preferences.",
    icon: <FaPalette />,
  },
  {
    title: "High-Speed WiFi",
    description:
      "Enterprise-grade internet connectivity throughout the venue for guests and presenters.",
    icon: <FaWifi />,
  },
];


//  Services Data (About Page / Services Section)
export const services = [
  {
    title: "Event Planning",
    description:
      "Comprehensive event planning services from concept to execution.",
    icon: <FaCheckCircle />,
  },
  {
    title: "Catering Options",
    description:
      "Multiple menu options with customization for dietary restrictions.",
    icon: <FaCheckCircle />,
  },
  {
    title: "Vendor Coordination",
    description:
      "Coordination with trusted vendors for flowers, photography, and entertainment.",
    icon: <FaCheckCircle />,
  },
  {
    title: "Setup & Cleanup",
    description:
      "Complete setup before your event and thorough cleanup afterward.",
    icon: <FaCheckCircle />,
  },
  {
    title: "Day-of Coordination",
    description:
      "Dedicated event manager to ensure everything runs smoothly on your special day.",
    icon: <FaCheckCircle />,
  },
  {
    title: "Technical Support",
    description:
      "On-site technical support for all audio-visual equipment throughout your event.",
    icon: <FaCheckCircle />,
  },
];



// gallery
export const galleryData = [
  {
    id: 1,
    title: "Grand Ballroom",
    description: "A luxurious setting for grand wedding receptions.",
    category: "wedding",
    image: "/images/grand-ballroom.jpeg",
  },
  {
    id: 2,
    title: "Reception Area",
    description: "Elegant and spacious reception area for welcoming guests.",
    category: "wedding",
    image: "/images/reception-area.jpeg",
  },
  {
    id: 3,
    title: "Dining Setup",
    description: "Beautifully arranged dining setup for formal events.",
    category: "corporate",
    image: "/images/dining-setup.jpeg",
  },
  {
    id: 4,
    title: "Stage Lighting",
    description: "Professional lighting setup for memorable moments.",
    category: "corporate",
    image: "/images/stage-lighting.jpeg",
  },
  {
    id: 5,
    title: "Outdoor Ceremony",
    description: "Romantic outdoor wedding setup surrounded by nature.",
    category: "wedding",
    image: "/images/outdoor-ceremony.jpg",
  },
  {
    id: 6,
    title: "VIP Lounge",
    description: "Exclusive VIP area for premium guests.",
    category: "other",
    image: "/images/vip-lounge.jpg",
  },
];
