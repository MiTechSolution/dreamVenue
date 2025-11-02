'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { FaArrowLeft,FaCrown,FaHeart, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { LoginUser } from "@/services/userLoginService/userLoginService";
import { useRouter } from 'next/navigation';
import AnimatedIcons from '../AnimatedIcons';
import BackButton from '../BackButton';

export default function Login() {
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const handleBack = () => {
       
    router.push('/');  
};

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Login form submitted:', formData);
  
  // };

  // validation schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // === submit handler ===
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);

      const Payload = {
        email: values.email,
        password: values.password,
      };

      const response = await LoginUser(Payload);

      // handle API failure (safeguard)
      if (!response || response.error) {
        toast.error(response?.error || "Login failed", { autoClose: 3000 });
        setSubmitting(false);
        return;
      }

      const token = response.token;
      // save consistent keys
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // redirect logic (after login)
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");

      toast.success("Login Successful!", { autoClose: 1000 });
      resetForm();
      router.push(redirectPath);
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Something went wrong", { autoClose: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", remember: false },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });

  const togglePasswordVisibility = () => setShowPassword((s) => !s);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Back Button */}
    <BackButton/>


{/* Animated icons */}
        
        <AnimatedIcons/>



        {/* glow background */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
  

      <motion.div
        className="relative bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto my-8 border border-yellow-500/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Form */}
          <motion.div
            className="w-full lg:w-1/2 p-6 md:p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Mobile Back Button (hidden on desktop) */}
            <motion.button
              onClick={handleBack}
              className="lg:hidden flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6 transition-all duration-300 group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaArrowLeft className="text-lg group-hover:scale-110 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </motion.button>

            <motion.div className="text-center mb-6" variants={itemVariants}>
              <motion.h1 
                className="text-2xl md:text-3xl font-cinzel font-bold gold-gradient mb-3"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Welcome Back
              </motion.h1>
              <p className="text-gray-300 text-sm md:text-base">Sign in to continue planning your dream wedding</p>
            </motion.div>

            {/* Social Login */}
            {/* <motion.div variants={itemVariants}>
              <button className="w-full flex items-center justify-center gap-3 bg-gray-800 border border-yellow-500/30 rounded-xl py-3 px-4 text-gray-200 font-semibold hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:border-yellow-400 mb-4 text-sm md:text-base">
                <FcGoogle className="text-xl md:text-2xl" />
                Sign in with Google
              </button>
              
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-yellow-500/30"></div>
                <span className="mx-3 text-yellow-400/80 font-medium text-sm">or continue with email</span>
                <div className="flex-1 border-t border-yellow-500/30"></div>
              </div>
            </motion.div> */}

            {/* Login Form */}
            <motion.form 
              onSubmit={formik.handleSubmit} 
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label className="block text-yellow-400 font-medium mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-yellow-500/60 text-sm" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm placeholder-gray-400"
                    placeholder="Enter your email"
                   
                  />
                   {formik.touched.email && formik.errors.email && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-yellow-400 font-medium mb-2 text-sm">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-yellow-500/60 text-sm" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm placeholder-gray-400"
                    placeholder="Enter your password"
                
                  />
                   {formik.touched.password && formik.errors.password && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
                  )}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-yellow-500/60 hover:text-yellow-400 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={formik.values.remember}
                    onChange={formik.handleChange}
                    className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-400 bg-gray-800 border-yellow-500/30"
                  />
                  <label htmlFor="remember" className="text-gray-300 text-xs">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-yellow-400 hover:text-yellow-300 text-xs font-medium transition-colors">
                  Forgot Password?
                </Link>
              </motion.div>

              <motion.button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full gold-button py-3 rounded-lg font-semibold text-sm md:text-base hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            </motion.form>

            <motion.p 
              className="text-center text-gray-300 mt-6 text-sm"
              variants={itemVariants}
            >
              Don't have an account?{' '}
              <Link href="/Register" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Create Account
              </Link>
            </motion.p>

            {/* Additional Features */}
            <motion.div 
              className="mt-8 pt-6 border-t border-yellow-500/20"
              variants={itemVariants}
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="text-yellow-400">
                  <div className="text-lg font-bold">500+</div>
                  <div className="text-xs text-gray-400">Events</div>
                </div>
                <div className="text-yellow-400">
                  <div className="text-lg font-bold">98%</div>
                  <div className="text-xs text-gray-400">Satisfaction</div>
                </div>
                <div className="text-yellow-400">
                  <div className="text-lg font-bold">50+</div>
                  <div className="text-xs text-gray-400">Venues</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Luxury Hall Image */}
          <motion.div
            className="w-full lg:w-1/2 relative overflow-hidden min-h-[300px] lg:min-h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Luxury Hall Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-black/80">
              <Image
                src="/images/main.jpg"
                alt="GrandVenue Hall"
                fill
                className="object-cover mix-blend-overlay"
                priority
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/60 z-10"></div>
            
            <div className="absolute inset-0 flex items-center justify-center z-20 p-6">
              <div className="text-center text-white">
                <motion.h2
                  className="text-2xl md:text-4xl font-cinzel font-bold mb-4 gold-gradient"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  GrandVenue Hall
                </motion.h2>
                <motion.p
                  className="text-sm md:text-lg text-yellow-300/90 mb-2"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Your Dream Wedding Awaits
                </motion.p>
                <motion.div
                  className="flex justify-center space-x-2 mt-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400/50 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400/30 rounded-full"></div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-4 right-4 text-yellow-400/30 text-2xl z-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <FaCrown />
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-4 text-yellow-400/30 text-xl z-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <FaHeart />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}