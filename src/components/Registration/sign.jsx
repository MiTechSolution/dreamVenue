'use client';

import { useState } from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from 'react-icons/fc';
import { FaCrown, FaHeart, FaRing, FaEyeSlash , FaEye, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { RegisterUser } from '@/services/userRegisterService/userRegisterService';
import { useRouter } from 'next/navigation';
import AnimatedIcons from '../AnimatedIcons';
import BackButton from '../BackButton';

// yup schema

 const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short !").max(50, "Too long!").required("Full Name is required"),
  email:Yup.string().email("Invalid email").required("Email is required"),
  phone:Yup.string().required("Phone number is required"),
  password:Yup.string()
   .required("Password is required")
   .min(8, "At Least 8 characters")
   .matches(/[A-Z]/ , "Must contain uppercase")
   .matches(/[a-z]/ , "Must contain lowercase")
   .matches(/[0-9]/ , "Must contain numbers")
   .matches(/[^A-Za-z0-9]/ , "Must contain  special characters"),
   
   confirmPassword:Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Confirm password is required"),
      terms: Yup.bool().oneOf([true], "You must accept the terms"),
 });


export default function Sign() {
  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   email: '',
  //   phone: '',
  //   password: '',
  //   confirmPassword: '',
   
  // });

  const [showPassword , setShowPassword] = useState(false);
  const RegisterationPayload = (values) => ({
     name: values.name,
      email: values.email,
      phone: values.phone,
      password:values.password,
  });

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
  //   console.log('Form submitted:', formData);
   
  // };

  //  handleSubmit Function
   const handleSubmit = async( values, {resetForm}) => {
       try {
        const Payload =  RegisterationPayload(values);
        const response = await RegisterUser(Payload);
          
        if(response) {
          toast.success(response.message , {autoClose: 2000});

        }
        resetForm();
       }
       catch (err) {
        if(err.inner) {
          err.inner.forEach((error)=> {
            toast.error(err.message , {autoClose: 3000})
          });
        } else {
          toast.error(err.message || "Registration failed", { autoClose: 3000 });
        }
       }
   };


  //  useFormik Hook
  
  const formik = useFormik({

   initialValues:{
    name:"",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
   },
   validationSchema:SignupSchema,
   onSubmit:handleSubmit,

  })

 


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

      {/* Animated Background Elements */}
     
<AnimatedIcons/>


        {/* Gold Glow Effects */}

        
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

            {/* <motion.div className="text-center mb-6" variants={itemVariants}>
              <motion.h1 
                className="text-2xl md:text-3xl font-cinzel font-bold gold-gradient mb-3"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Begin Your Forever
              </motion.h1>
              <p className="text-gray-300 text-sm md:text-base">Create your account and start planning your dream wedding</p>
            </motion.div> */}

            {/* Social Signup */}
            {/* <motion.div variants={itemVariants}>
              <button className="w-full flex items-center justify-center gap-3 bg-gray-800 border border-yellow-500/30 rounded-xl py-3 px-4 text-gray-200 font-semibold hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:border-yellow-400 mb-4 text-sm md:text-base">
                <FcGoogle className="text-xl md:text-2xl" />
                Sign up with Google
              </button>
              
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-yellow-500/30"></div>
                <span className="mx-3 text-yellow-400/80 font-medium text-sm">or continue with email</span>
                <div className="flex-1 border-t border-yellow-500/30"></div>
              </div>
            </motion.div> */}

            {/* Signup Form */}
            <motion.form 
              onSubmit={formik.handleSubmit} 
              className="space-y-4"
              variants={containerVariants}
            >
              <div className="grid grid-cols-1 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-yellow-400 font-medium mb-2 text-sm">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}

                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm placeholder-gray-400"
                    placeholder="Enter your full name"
                   
                  />
                   {formik.touched.name && formik.errors.name && (
                    <div className='text-red-500 text-sm mt-1'>
                      {formik.errors.name}
                      
                    </div>
                   )}
                </motion.div>

                {/* email */}

                <motion.div variants={itemVariants}>
                  <label className="block text-yellow-400 font-medium mb-2 text-sm">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm placeholder-gray-400"
                    placeholder="Enter your email"
                    
                  />
                   {formik.touched.email && formik.errors.email && (
                    <div className='text-red-500 text-sm mt-1'>
                      {formik.errors.email}
                      
                    </div>
                   )}
                </motion.div>
              </div>
{/* phone */}
              <div >
                <motion.div  variants={itemVariants}>
                  <label className="block text-yellow-400 font-medium mb-2 text-sm">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm placeholder-gray-400"
                    placeholder="Phone number"
                    required
                  />
                   {formik.touched.phone && formik.errors.phone && (
                    <div className='text-red-500 text-sm mt-1'>
                      {formik.errors.phone}
                      
                    </div>
                   )}
                </motion.div>

                {/* <motion.div variants={itemVariants}>
                  <label className="block text-yellow-400 font-medium mb-2 text-sm">Wedding Date</label>
                  <input
                    type="date"
                    name="weddingDate"
                    value={formData.weddingDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm placeholder-gray-400"
                    required
                  />
                </motion.div> */}
              </div>


{/* password */}
              <motion.div variants={itemVariants}>
                <label className="block text-yellow-400 font-medium mb-2 text-sm">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm placeholder-gray-400"
                  placeholder="Create a password"
                 
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
              </motion.div>




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



              <motion.div variants={itemVariants}>
                <label className="block text-yellow-400 font-medium mb-2 text-sm">Confirm Password</label>
                <input
                  type="password"
                   name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm placeholder-gray-400"
                  placeholder="Confirm your password"
                  
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
            )}
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id='terms'
                  name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
                  className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-400 mt-1 bg-gray-800 border-yellow-500/30"
               
                />
                <label htmlFor="terms" className="text-gray-300 text-xs">
                  I agree to the <a href="#" className="text-yellow-400 hover:text-yellow-300 font-medium">Terms of Service</a> and <a href="#" className="text-yellow-400 hover:text-yellow-300 font-medium">Privacy Policy</a>
                </label>
              </motion.div>
              {formik.touched.terms && formik.errors.terms && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.terms}</div>
          )}

              <motion.button
                type="submit"
                className="w-full gold-button py-3 rounded-lg font-semibold text-sm md:text-base hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
              </motion.button>
            </motion.form>

            <motion.p 
              className="text-center text-gray-300 mt-4 text-sm"
              variants={itemVariants}
            >
              Already have an account?{' '}
              <Link href="/Login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Sign in
              </Link>
            </motion.p>
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
                  Where Dreams Come True
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

{/* ToastContainer */}

<ToastContainer position='top-right' />

    </div>
  );
}