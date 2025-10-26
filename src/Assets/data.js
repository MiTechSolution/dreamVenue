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
    title: "Royal Wedding Celebration",
    description: "A grand wedding ceremony with exquisite decorations and golden theme",
    image: "/images/marriage.jpg",
    category: "wedding"
  },
  {
    id: 2,
    title: "Elegant Engagement Ceremony",
    description: "Intimate engagement ceremony with floral arrangements",
    image: "/images/engagment.jpg",
    category: "engagement"
  },
  {
    id: 3,
    title: "Corporate Gala Night",
    description: "Professional corporate event with sophisticated setup",
    image: "/images/dining-setup.jpeg",
    category: "corporate"
  },
  {
    id: 4,
    title: "Luxury Birthday Bash",
    description: "Grand birthday celebration with theme decorations",
    image: "/images/birthday.jpg",
    category: "birthday"
  },
  {
    id: 5,
    title: "Traditional Wedding Reception",
    description: "Cultural wedding reception with traditional elements",
    image: "/images/marriage2.jpg",
    category: "wedding"
  },
  {
    id: 6,
    title: "Modern Engagement Party",
    description: "Contemporary engagement party with minimalist decor",
    image: "/images/stage-lighting.jpeg",
    category: "engagement"
  },
  {
    id: 7,
    title: "Business Conference",
    description: "Professional business conference setup",
    image: "/images/outdoor-ceremony.jpg",
    category: "corporate"
  },
  {
    id: 8,
    title: "Anniversary Celebration",
    description: "Golden anniversary celebration with vintage theme",
    image: "/images/vip-lounge.jpg",
    category: "other"
  },
  {
    id: 9,
    title: "Bridal Shower",
    description: "Elegant bridal shower with pastel decorations",
    image: "/images/grand-ballroom.jpeg",
    category: "other"
  },
  {
    id: 10,
    title: "Destination Wedding",
    description: "Luxury destination wedding setup",
    image: "/images/marriage3.jpg",
    category: "wedding"
  },
  {
    id: 11,
    title: "Ring Ceremony",
    description: "Traditional ring ceremony with cultural elements",
    image: "/images/reception-area.jpeg",
    category: "engagement"
  },
  {
    id: 12,
    title: "Product Launch",
    description: "Corporate product launch event",
    image: "/images/grand-ballroom.jpeg",
    category: "corporate"
  },
  // Add more images as needed
];
