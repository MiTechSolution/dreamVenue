import ProtectedRoute from '@/components/Auth/ProtectedRoute'
import BookingSystem from '@/components/booking/BookingSystem'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
    <BookingSystem/>
    </ProtectedRoute>
  )
}

export default page