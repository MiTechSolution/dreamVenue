'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password for:', email);
    // Handle password reset logic here
  };

  const handleBack = () => {
    router.back('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Back Button */}
      <motion.button
        onClick={handleBack}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-all duration-300 group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FaArrowLeft className="text-lg" />
        <span className="font-medium">Back</span>
      </motion.button>

      <motion.div
        className="relative bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden w-full max-w-md mx-auto my-8 border border-yellow-500/30 p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-yellow-400 text-4xl mb-4"
          >
            <FaCrown />
          </motion.div>
          <motion.h1 
            className="text-2xl font-cinzel font-bold gold-gradient mb-2"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Reset Password
          </motion.h1>
          <p className="text-gray-300 text-sm">
            Enter your email to receive reset instructions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-yellow-400 font-medium mb-2 text-sm">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-yellow-500/60 text-sm" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full gold-button py-3 rounded-lg font-semibold text-sm hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Reset Link
          </motion.button>
        </form>

        <p className="text-center text-gray-300 mt-6 text-sm">
          Remember your password?{' '}
          <Link href="/Login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
            Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}