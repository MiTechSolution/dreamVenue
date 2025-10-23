"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For redirect
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaSignInAlt, FaSpinner , FaArrowLeft , FaCrown } from "react-icons/fa";
import { LoginUser } from "@/services/userLoginService/userLoginService";

export default function Login() {
  const [fadeIn, setFadeIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Validation Schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    debugger
    const Payload = {
      email: values.email,
      password: values.password,
    };
    const response =await LoginUser(Payload);
    const token = response.token;
    localStorage.setItem("authToken", token);
    if(response){
      toast.success("Login Successful!", { autoClose: 2000 });
      setSubmitting(false);
      resetForm();
      router.push("/"); // redirect to home page
    }
    setSubmitting(true);   
  };

//  Back button handler
const handleBack = () => {
  // router.back(); // Go back to previous page
  
  router.push('/'); // Go to home page
  // router.push('/login'); // Go to login page
};
  // useFormik Hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit, // <-- assigned here
  });

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-200">
       <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-10 gold-button p-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
        title="Go Back"
      >
        <FaArrowLeft className="text-black text-lg" />
      </button>

      {/* Header */}
      {/* <header className="w-full py-6">
        <div className="container mx-auto px-6 flex justify-center">
          <a href="/" className="text-3xl font-bold text-[#D4AF37]">
            GrandVenue
          </a>
        </div>
      </header> */}

      {/* Main */}
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto text-center">
            {/* Floating crown */}
            <div className="floating inline-block mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mx-auto">
                {/* <i className="fas fa-crown text-2xl text-[#D4AF37]"></i> */}
                <FaCrown className="text-2xl text-[#D4AF37]"/>

              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400 mb-6">Sign in to your GrandVenue account</p>

            {/* Form */}
            <div
              className={`bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border gold-border shadow-2xl rounded-2xl p-8 fade-in ${
                fadeIn ? "opacity-100 translate-y-0 transition-all duration-800" : "opacity-0 translate-y-5"
              }`}
            >
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="form-input w-full rounded-lg p-3 pl-10 focus:outline-none bg-[#1A1A1A] border border-[#2A2A2A] text-gray-200"
                    />
                    <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="form-input w-full rounded-lg p-3 pl-10 focus:outline-none bg-[#1A1A1A] border border-[#2A2A2A] text-gray-200"
                    />
                    <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
                  )}
                </div>

                {/* Remember me */}
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formik.values.remember}
                      onChange={formik.handleChange}
                      className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-400">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-[#D4AF37] hover:underline">
                    Forgot Password?
                  </a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="gold-button cursor-pointer  w-full py-3  font-semibold text-lg text-center rounded-lg "
                >
                  Login
                </button>
              </form>

              {/* Signup link */}
              <div className="mt-8 pt-6 border-t border-yellow-700/20 text-center">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <Link href="/Register" className="text-[#D4AF37] font-semibold hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

            {/* Security Note */}
            <div className="mt-6 text-center fade-in">
              <p className="text-xs text-gray-500">
                <i className="fas fa-shield-alt text-[#D4AF37] mr-1"></i>
                Your data is securely encrypted and protected
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Container */}
      <ToastContainer position="top-right" />
    </div>
  );
}
