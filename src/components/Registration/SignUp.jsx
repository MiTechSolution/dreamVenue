"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaShieldAlt,
  FaArrowLeft, // Added back arrow icon
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Added for navigation
import { RegisterUser } from "@/services/userRegisterService/userRegisterService";

// ✅ Yup Schema
const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short!").max(50, "Too long!").required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "At least 8 characters")
    .matches(/[A-Z]/, "Must contain uppercase")
    .matches(/[a-z]/, "Must contain lowercase")
    .matches(/[0-9]/, "Must contain number")
    .matches(/[^A-Za-z0-9]/, "Must contain special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Initialize router

  const RegistrationPayload = (values) => ({
    name: values.name,
    email: values.email,
    phone: values.phone,
    password: values.password,
  });

  // ✅ handleSubmit function
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const Payload = RegistrationPayload(values);
      const response = await RegisterUser(Payload);

      if (response) {
        toast.success(response.message, { autoClose: 2000 });
      }
      resetForm();
    } catch (err) {
      if (err.inner) {
        err.inner.forEach((error) => {
          toast.error(error.message, { autoClose: 3000 });
        });
      } else {
        toast.error(err.message || "Registration failed", { autoClose: 3000 });
      }
    }
  };

  // ✅ Back button handler
  const handleBack = () => {
    // router.back(); // Go back to previous page
    
    router.push('/'); // Go to home page
    // router.push('/login'); // Go to login page
  };

  // ✅ useFormik Hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: SignupSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-2.5 relative">
      {/* Back Arrow Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-10 gold-button p-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
        title="Go Back"
      >
        <FaArrowLeft className="text-black text-lg" />
      </button>

      <div className="w-full max-w-md bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border gold-border shadow-2xl rounded-2xl p-8">
        <div className="max-w-md mx-auto text-center mb-3 fade-in">
          <h1 className="text-4xl font-cinzel font-bold mb-2 gold-gradient">Create Account</h1>
          {/* <p className="text-gray-400">Join GrandVenue Hall to book our luxurious venue for your special events</p> */}
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Full Name"
              className="w-full p-1 pl-10 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email Address"
              className="w-full p-1 pl-10 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Phone Number"
              className="w-full p-1 pl-10 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
              className="w-full p-1 pl-10 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Live Password Rules */}
          <div className="text-sm mt-1 flex gap-0.5 flex-wrap justify-center space-y-1">
            <p className={formik.values.password.length >= 8 ? "text-green-500" : "text-red-500"}>
              At least 8 characters
            </p>
            <p className={/[A-Z]/.test(formik.values.password) ? "text-green-500" : "text-red-500"}>
              | Uppercase letter
            </p>
            <p className={/[a-z]/.test(formik.values.password) ? "text-green-500" : "text-red-500"}>
              | Lowercase letter
            </p>
            <p className={/[0-9]/.test(formik.values.password) ? "text-green-500" : "text-red-500"}>
              | Number
            </p>
            <p
              className={
                /[^A-Za-z0-9]/.test(formik.values.password)
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
               | Special character
            </p>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Confirm Password"
              className="w-full p-2 pl-10 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
              className="h-4 w-4 text-gold border-gray-300 rounded"
            />
            <label className="text-gray-400 text-sm">
              I agree to the <span className="text-gold">Terms of Service</span> and{" "}
              <span className="text-gold">Privacy Policy</span>
            </label>
          </div>
          {formik.touched.terms && formik.errors.terms && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.terms}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-lg text-black gold-button cursor-pointer flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            <FaUserPlus /> Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 pt-6 border-t border-gold/20 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/Login" className="gold-text font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center text-gray-400 text-sm">
          <FaShieldAlt className="inline text-gold mr-1" /> Your personal information is protected with enterprise-grade security
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Signup;