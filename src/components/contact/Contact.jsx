"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPaperPlane, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaCheck,
  FaStar
} from "react-icons/fa";

export default function Contact() {
  const [toast, setToast] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Formik + Yup validation setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      subject: Yup.string().required("Please select a subject"),
      message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(values);
      setToast("Message sent successfully! We will get back to you within 24 hours.");
      resetForm();
      setIsSubmitting(false);
      
      setTimeout(() => setToast(""), 5000);
    },
  });

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Our Venue",
      details: "123 Luxury Avenue, Wedding District",
      subdetails: "Karachi, Pakistan 75500",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: "+92 300 1234567",
      subdetails: "Mon-Sun, 9AM-11PM",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: "info@grandvenue.com",
      subdetails: "We reply within 24 hours",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaClock />,
      title: "Business Hours",
      details: "9:00 AM - 11:00 PM",
      subdetails: "7 Days a Week",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-center overflow-hidden">
        
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/20 to-black/90"></div> */}
          

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



          {/* Animated Elements */}
          <motion.div
            className="absolute top-20 left-10 text-yellow-400/10 text-6xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <FaStar />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-yellow-400/10 text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FaPaperPlane />
          </motion.div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-cinzel font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gold-gradient">Get In Touch</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's create magic together. Reach out to us and let's start planning 
            your unforgettable celebration at GrandVenue Hall.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Side: Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-cinzel font-bold mb-8 gold-gradient">
                Connect With Us
              </h2>

              {/* Contact Info Cards */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <div className={`bg-gradient-to-r ${item.color} rounded-2xl p-6 transition-all duration-300 group-hover:shadow-xl`}>
                      <div className="flex items-start gap-4">
                        <div className="text-2xl text-white mt-1">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {item.title}
                          </h3>
                          <p className="text-white/90 font-medium">{item.details}</p>
                          <p className="text-white/70 text-sm">{item.subdetails}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Us */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30"
              >
                <h3 className="text-xl font-cinzel font-bold text-yellow-400 mb-4">
                  Why Choose GrandVenue?
                </h3>
                <ul className="space-y-3">
                  {[
                    "24/7 Customer Support",
                    "Personal Event Manager",
                    "Flexible Booking Options",
                    "Premium Catering Services",
                    "Professional Photography"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <FaCheck className="text-yellow-400 text-sm" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right Side: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-cinzel font-bold mb-6 gold-gradient">
                Send Your Message
              </h2>

              <motion.form
                onSubmit={formik.handleSubmit}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30 space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Name Field */}
                <div>
                  <label className="block text-yellow-400 font-medium mb-3">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className={`w-full bg-gray-800 border ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-400 focus:border-red-400"
                        : "border-yellow-500/30 focus:border-yellow-400"
                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                    placeholder="Enter your full name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {formik.errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-yellow-400 font-medium mb-3">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className={`w-full bg-gray-800 border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-400 focus:border-red-400"
                        : "border-yellow-500/30 focus:border-yellow-400"
                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                    placeholder="Enter your email address"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {formik.errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-yellow-400 font-medium mb-3">Subject *</label>
                  <select
                    name="subject"
                    onChange={formik.handleChange}
                    value={formik.values.subject}
                    className={`w-full bg-gray-800 border ${
                      formik.touched.subject && formik.errors.subject
                        ? "border-red-400 focus:border-red-400"
                        : "border-yellow-500/30 focus:border-yellow-400"
                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300`}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Venue Tour">Schedule a Venue Tour</option>
                    <option value="Event Planning">Event Planning Consultation</option>
                    <option value="Pricing">Pricing Information</option>
                    <option value="Partnership">Partnership Opportunities</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.touched.subject && formik.errors.subject && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {formik.errors.subject}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-yellow-400 font-medium mb-3">Your Message *</label>
                  <textarea
                    name="message"
                    rows="5"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    className={`w-full bg-gray-800 border ${
                      formik.touched.message && formik.errors.message
                        ? "border-red-400 focus:border-red-400"
                        : "border-yellow-500/30 focus:border-yellow-400"
                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 resize-none`}
                    placeholder="Tell us about your event dreams, requirements, or any questions you have..."
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {formik.errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full gold-button py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-cinzel font-bold mb-6 gold-gradient">
              Visit Our Luxury Venue
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Located in the heart of the city, our venue is easily accessible 
              and offers ample parking facilities for your convenience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-yellow-500/30 shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.834872402201!2d67.02810731500016!3d24.813584584069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c5361ff85a5%3A0x240a5e1f111e8b5a!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1638345678901!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed top-6 right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-4 rounded-xl shadow-2xl z-50 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                <FaCheck className="text-black" />
              </div>
              <div className="text-sm font-medium">{toast}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}