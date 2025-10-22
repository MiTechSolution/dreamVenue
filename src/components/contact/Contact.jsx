"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [toast, setToast] = useState("");

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
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setToast("Message sent successfully! We will get back to you soon.");
      resetForm();
      setTimeout(() => setToast(""), 3000);
    },
  });

  // ✅ Fade-in Animation on scroll
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    fadeElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="bg-black text-white">
     

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black text-center">
        <h1 className="text-5xl md:text-6xl font-cinzel font-bold mb-6 fade-in gold-gradient">
          Contact Us
        </h1>
        <p
          className="text-xl text-gray-300 max-w-3xl mx-auto fade-in"
          style={{ transitionDelay: "0.2s" }}
        >
          Get in touch with our team to discuss your event requirements or
          schedule a tour of our luxurious venue.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side: Form */}
          <div className="fade-in">
            <h2 className="text-3xl font-cinzel font-bold mb-6 gold-gradient">
              Send Us a Message
            </h2>

            <form
              onSubmit={formik.handleSubmit}
              className="bg-gray-900/50 rounded-xl p-8 gold-border space-y-6"
            >
              {/* Name */}
              <div>
                <label className="block text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className={`w-full bg-gray-800 border ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-400"
                      : "border-gray-700"
                  } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                  placeholder="Enter your full name"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={`w-full bg-gray-800 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-400"
                      : "border-gray-700"
                  } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-gray-300 mb-2">Subject *</label>
                <select
                  name="subject"
                  onChange={formik.handleChange}
                  value={formik.values.subject}
                  className={`w-full bg-gray-800 border ${
                    formik.touched.subject && formik.errors.subject
                      ? "border-red-400"
                      : "border-gray-700"
                  } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Venue Tour">Schedule a Venue Tour</option>
                  <option value="Event Planning">
                    Event Planning Consultation
                  </option>
                  <option value="Pricing">Pricing Information</option>
                  <option value="Partnership">Partnership Opportunities</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.subject && formik.errors.subject && (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-300 mb-2">Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  className={`w-full bg-gray-800 border ${
                    formik.touched.message && formik.errors.message
                      ? "border-red-400"
                      : "border-gray-700"
                  } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                  placeholder="Tell us about your event or inquiry..."
                ></textarea>
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="gold-button px-8 py-4 rounded-full text-lg font-medium w-full"
              >
                Send Message <i className="fas fa-paper-plane ml-2"></i>
              </button>
            </form>
          </div>

          {/* Right Side: Map + Info */}
          <div className="fade-in" style={{ transitionDelay: "0.2s" }}>
            <h2 className="text-3xl font-cinzel font-bold mb-6 gold-gradient">
              Find Us
            </h2>

            <div className="rounded-xl overflow-hidden gold-border mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!..."
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed  top-40 right-6 bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg transition-all">
          {toast}
        </div>
      )}
    </div>
  );
}
