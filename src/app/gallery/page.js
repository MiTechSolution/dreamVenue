
import Images from '@/components/gallery/Images'
import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import React from 'react'

const page = () => {
  return (
    <>
    <ProtectedRoute>
    <Navbar/>
   <Images/>
   <Footer/>
    </ProtectedRoute>
  
   </>
  )
}

export default page