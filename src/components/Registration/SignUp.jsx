"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaShieldAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { RegisterUser } from "@/services/authService";

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

  const RegistrationPayload = (values) => { {
    return {
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };
  } };

  const handleSubmit = async (values) => {
    debugger
    try {
      // Validate using Yup manually
      const Payload =   RegistrationPayload(values);
      const response = await RegisterUser(Payload);
      if(response){
        toast.success(response.message, { autoClose: 2000 });
      }
      console.log("Registration successful:", response);
    } catch (err) {
      if (err.inner) {
        err.inner.forEach((error) => {
          toast.error(error.message, { autoClose: 3000 });
        });
      } else {
        toast.error(response.message, { autoClose: 3000 });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 pt-24">
      <div className="w-full max-w-md bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border gold-border shadow-2xl rounded-2xl p-8 ">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gold mb-2">Create Account</h1>
          <p className="text-gray-400">Join GrandVenue to plan your perfect event</p>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            terms: false,
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="space-y-5">
              {/* Name */}
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Field
                  name="name"
                  placeholder="Full Name"
                  className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Field
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Live password rules */}
              <div className="text-sm mt-1 space-y-1">
                <p className={values.password.length >= 8 ? "text-green-500" : "text-red-500"}>• At least 8 characters</p>
                <p className={/[A-Z]/.test(values.password) ? "text-green-500" : "text-red-500"}>• Uppercase letter</p>
                <p className={/[a-z]/.test(values.password) ? "text-green-500" : "text-red-500"}>• Lowercase letter</p>
                <p className={/[0-9]/.test(values.password) ? "text-green-500" : "text-red-500"}>• Number</p>
                <p className={/[^A-Za-z0-9]/.test(values.password) ? "text-green-500" : "text-red-500"}>• Special character</p>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <Field type="checkbox" name="terms" className="h-4 w-4 text-gold border-gray-300 rounded" />
                <label className="text-gray-400 text-sm">
                  I agree to the <span className="text-gold">Terms of Service</span> and <span className="text-gold">Privacy Policy</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-lg text-black gold-button cursor-pointer flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <FaUserPlus /> Create Account
              </button>
            </Form>
          )}

        </Formik>
 <div className="mt-8 pt-6 border-t border-gold/20 text-center">
                        <p className="text-gray-400">Already have an account? 
                            <Link href="/Login" className="gold-text font-semibold hover:underline">Sign In</Link>
                        </p>
                    </div>
        <div className="mt-6 text-center text-gray-400 text-sm">
          <FaShieldAlt className="inline text-gold mr-1" /> Your personal information is protected with enterprise-grade security
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Signup;
