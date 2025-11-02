'use client';

import { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaCheck,
  FaClock,
  FaFilePdf,
  FaArrowLeft,
  FaCrown
} from 'react-icons/fa';
import {
  FcConferenceCall,
  FcCalendar,
  FcMoneyTransfer,
  FcOk
} from 'react-icons/fc';
import BackButton from '../BackButton';
import { UserBooking } from '@/services/userBookingService/bookingService';
import { toast } from 'react-toastify';


const BookingSystem = () => {
  const [step, setStep] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [bookingStatus, setBookingStatus] = useState('pending');
  const [currentDate, setCurrentDate] = useState(new Date());
  const userID= JSON.parse(localStorage.getItem("user"));
  const id = userID?.id;
  console.log("UserID in booking system:", id);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Mock booked dates
  const bookedDates = [
    '2024-12-25',
    '2024-12-30',
    '2024-12-31',
    '2025-01-05',
    '2025-01-10'
  ];

  // Calculate amount function - useCallback 
  const calculateAmount = useCallback((values, setFieldValue) => {
    if (values.bookingType === 'complete_hall') {
      setFieldValue('totalAmount', 500000);
      setFieldValue('guestCount', '');
    } else if (values.bookingType === 'per_head' && values.guestCount) {
      const amount = values.guestCount * 2500;
      setFieldValue('totalAmount', amount);
    }
  }, []);

  const Payload = (values, id) => {
    debugger
    return {
      user_id: id,
      eventType: values.eventType,
      eventTime: values.eventTime,
      eventDate: values.eventDate,
      bookingType: values.bookingType,
      guestCount: values.guestCount,
      totalAmount: values.totalAmount,
      specialRequest: values.specialRequest,
      paymentMethod: values.paymentMethod,
      easyPaisaNumber: values.easyPaisaNumber,
      jazzCashNumber: values.jazzCashNumber,
      accountNumber: values.accountNumber
    }
  }


  const HandleSubmit = async (values) => {
    debugger
    // Final submission logic here 
    try {
      const BookinPayload = Payload(values, id)
      const response = await UserBooking(BookinPayload);
      if (response) {
        toast.success("Booking successful!", { autoClose: 3000 });
         setStep(5);
      }

    } catch (error) {
      if (err.inner) {
        err.inner.forEach((error) => {
          toast.error(err.message, { autoClose: 3000 })
        });
      } else {
        toast.error(err.message || "Registration failed", { autoClose: 3000 });
      }
    }

  };


  const formik = useFormik({
    initialValues: {
      eventType: '',
      eventTime: '',
      eventDate: '',
      bookingType: '',
      guestCount: 1,
      totalAmount: 0,
      specialRequest: '',
      paymentMethod: '',
      easyPaisaNumber: '',
      jazzCashNumber: '',
      accountNumber: ''
    },
    validationSchema: Yup.object({
      eventType: Yup.string().required('Event type is required'),
      eventTime: Yup.string().required('Event time is required'),
      eventDate: Yup.string().required('Event date is required'),
      bookingType: Yup.string().required('Booking type is required'),

      guestCount: Yup.number().when('bookingType', (bookingType, schema) => {
        if (bookingType === 'per_head') {
          return schema
            .min(1, 'At least 1 guest required')
            .max(500, 'Maximum 500 guests allowed')
            .required('Guest count is required');
        }
        return schema; // complete_hall ke liye no validation
      }),


      specialRequest: Yup.string().max(500, 'Maximum 500 characters allowed')
    }),
    onSubmit: HandleSubmit
  });

  // Handle booking type change
  const handleBookingTypeChange = (type) => {
    formik.setFieldValue('bookingType', type);

    // Calculate amount after a small delay
    setTimeout(() => {
      if (type === 'complete_hall') {
        formik.setFieldValue('totalAmount', 500000);
        formik.setFieldValue('guestCount', '');
      } else if (type === 'per_head') {
        const amount = (formik.values.guestCount || 1) * 2500;
        formik.setFieldValue('totalAmount', amount);
      }
    }, 100);
  };

  // Handle guest count change
  const handleGuestCountChange = (e) => {
    formik.handleChange(e);
    const count = parseInt(e.target.value) || 0;
    if (formik.values.bookingType === 'per_head' && count > 0) {
      const amount = count * 2500;
      formik.setFieldValue('totalAmount', amount);
    }
  };

  // Calendar functions
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateBooked = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookedDates.includes(dateStr);
  };

  const isDateSelected = (date) => {
    return selectedDates.some(selectedDate =>
      selectedDate.toDateString() === date.toDateString()
    );
  };

  const handleDateSelect = (date) => {
    if (date < new Date().setHours(0, 0, 0, 0)) return;

    const dateStr = date.toISOString().split('T')[0];
    if (bookedDates.includes(dateStr)) return;

    const newSelectedDates = [...selectedDates];
    const dateIndex = newSelectedDates.findIndex(d => d.toDateString() === date.toDateString());

    if (dateIndex > -1) {
      newSelectedDates.splice(dateIndex, 1);
    } else {
      newSelectedDates.push(date);
    }

    setSelectedDates(newSelectedDates);

    if (newSelectedDates.length > 0) {
      const datesString = newSelectedDates.map(d =>
        d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      ).join(', ');
      formik.setFieldValue('eventDate', datesString);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isPast = date < new Date().setHours(0, 0, 0, 0);
      const isBooked = isDateBooked(date);
      const isSelected = isDateSelected(date);

      days.push(
        <motion.button
          key={day}
          whileHover={{ scale: isPast || isBooked ? 1 : 1.1 }}
          whileTap={{ scale: isPast || isBooked ? 1 : 0.95 }}
          className={`h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${isPast
            ? 'text-gray-500 cursor-not-allowed'
            : isBooked
              ? 'bg-red-500 text-white cursor-not-allowed'
              : isSelected
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          onClick={() => !isPast && !isBooked && handleDateSelect(date)}
          disabled={isPast || isBooked}
        >
          {day}
        </motion.button>
      );
    }

    return days;
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const steps = [
    { number: 1, title: 'Event Details', icon: <FaCalendarAlt /> },
    { number: 2, title: 'Booking Type', icon: <FaUsers /> },
    { number: 3, title: 'Special Requests', icon: <FaCrown /> },
    { number: 4, title: 'Payment', icon: <FaMoneyBillWave /> },
    { number: 5, title: 'Confirmation', icon: <FaCheck /> }
  ];
  const [formError, setFormError] = useState('');
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-700 to-black py-8 px-4">
      <Image
        src="/images/main.jpg"
        alt="GrandVenue Hall"
        fill
        className="object-cover mix-blend-overlay"
        priority
      />
      <BackButton />
      {/* Header Notification */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto mb-8"
      >
        <div className="bg-white border  rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-3 text-green-950">
            <FaClock className="text-xl " />
            <p className="text-sm  font-bold">
              Booking confirmation will be processed within 24 hours. Status updates will be sent via email.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-yellow-500/30"
      >
        {/* Progress Bar */}
        <div className="p-6 border-b border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step >= stepItem.number
                  ? 'bg-yellow-500 border-yellow-500 text-black'
                  : 'border-yellow-500/30 text-yellow-500/30'
                  } transition-all duration-300`}>
                  {stepItem.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepItem.number ? 'bg-yellow-500' : 'bg-yellow-500/30'
                    } transition-all duration-300`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-cinzel font-bold gold-gradient">
              Book Your Dream Event
            </h1>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Step 1: Event Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-6 md:p-8"
            >
              <h2 className="text-xl font-cinzel font-bold text-yellow-400 mb-6">Event Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Type */}
                <div>
                  <label className="block text-yellow-400 font-medium mb-3">Event Type</label>
                  <select
                    name="eventType"
                    value={formik.values.eventType}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none"
                  >
                    <option value="">Select Event Type</option>
                    <option value="wedding">Wedding</option>
                    <option value="engagement">Engagement</option>
                    <option value="reception">Reception</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="other">Other</option>
                  </select>
                  {formik.errors.eventType && (
                    <div className="text-red-400 text-sm mt-1">{formik.errors.eventType}</div>
                  )}
                </div>

                {/* Event Time */}
                <div>
                  <label className="block text-yellow-400 font-medium mb-3">Event Time</label>
                  <select
                    name="eventTime"
                    value={formik.values.eventTime}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none"
                  >
                    <option value="">Select Time Slot</option>
                    <option value="morning">Morning (8AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 4PM)</option>
                    <option value="evening">Evening (4PM - 8PM)</option>
                    <option value="night">Night (8PM - 12AM)</option>
                    <option value="full_day">Full Day (8AM - 12AM)</option>
                  </select>
                  {formik.errors.eventTime && (
                    <div className="text-red-400 text-sm mt-1">{formik.errors.eventTime}</div>
                  )}
                </div>
              </div>

              {/* Event Date with Calendar */}
              <div className="mt-6">
                <label className="block text-yellow-400 font-medium mb-3">Event Date</label>
                <div className="relative">
                  <input
                    type="text"
                    name="eventDate"
                    value={formik.values.eventDate}
                    readOnly
                    onClick={() => setShowCalendar(true)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-yellow-500/30 text-white cursor-pointer focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none"
                    placeholder="Select event date(s)"
                  />
                  <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-500/60" />
                </div>
                {formik.errors.eventDate && (
                  <div className="text-red-400 text-sm mt-1">{formik.errors.eventDate}</div>
                )}
              </div>

              {/* Calendar Legend */}
              <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-300">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-300">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-gray-300">Selected</span>
                </div>

              </div>
              {formError && (
                <p className="text-red-500 text-center text-sm mt-2">{formError}</p>
              )}

              <div className="flex justify-end mt-8">
                <motion.button
                  type="button"
                  onClick={() => {
                    if (!formik.values.eventType || !formik.values.eventTime || !formik.values.eventDate) {
                      setFormError("Please fill all required fields before proceeding.");
                      return;
                    }
                    setFormError("");
                    nextStep();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gold-button px-8 py-3 rounded-xl font-semibold"

                //   disabled={!formik.values.eventType || !formik.values.eventTime || !formik.values.eventDate}
                >
                  Next: Booking Type

                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Booking Type */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-6 md:p-8"
            >
              <h2 className="text-xl font-cinzel font-bold text-yellow-400 mb-6">Booking Type & Pricing</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Booking Type */}
                <div className="col-span-2">
                  <label className="block text-yellow-400 font-medium mb-4">Booking Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${formik.values.bookingType === 'per_head'
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-yellow-500/30 bg-gray-800 hover:border-yellow-400'
                        }`}
                      onClick={() => handleBookingTypeChange('per_head')}
                    >
                      <div className="text-center">
                        <FcConferenceCall className="text-4xl mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-2">Per Head</h3>
                        <p className="text-gray-300 text-sm">PKR2,500 per person</p>
                        <p className="text-yellow-400 text-sm mt-2">Flexible pricing</p>
                      </div>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${formik.values.bookingType === 'complete_hall'
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-yellow-500/30 bg-gray-800 hover:border-yellow-400'
                        }`}
                      onClick={() => handleBookingTypeChange('complete_hall')}
                    >
                      <div className="text-center">
                        <FcCalendar className="text-4xl mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-2">Complete Hall</h3>
                        <p className="text-gray-300 text-sm">PKR500,000 fixed</p>
                        <p className="text-yellow-400 text-sm mt-2">Up to 500 guests</p>
                      </div>
                    </motion.button>
                  </div>
                  {formik.errors.bookingType && (
                    <div className="text-red-400 text-sm mt-2">{formik.errors.bookingType}</div>
                  )}
                </div>

                {/* Guest Count (only for per head) */}
                {formik.values.bookingType === 'per_head' && (
                  <div className="col-span-2">
                    <label className="block text-yellow-400 font-medium mb-3">
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        name="guestCount"
                        value={formik.values.guestCount}
                        onChange={handleGuestCountChange}
                        min="1"
                        max="500"
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none"
                        placeholder="Enter number of guests"
                      />
                      <div className="text-2xl text-yellow-400">
                        <FaUsers />
                      </div>
                    </div>
                    {formik.errors.guestCount && (
                      <div className="text-red-400 text-sm mt-1">{formik.errors.guestCount}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Amount Display */}
              {formik.values.bookingType && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-6"
                >
                  <div className="text-center">
                    <FcMoneyTransfer className="text-4xl mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Total Amount</h3>
                    <div className="text-3xl font-bold text-white">
                      PKR{formik.values.totalAmount.toLocaleString()}
                    </div>
                    <p className="text-gray-300 text-sm mt-2">
                      {formik.values.bookingType === 'per_head'
                        ? `PKR2,500 × ${formik.values.guestCount || 0} guests`
                        : 'Complete hall booking (up to 500 guests)'
                      }
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between mt-8">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  <FaArrowLeft />
                  Previous
                </motion.button>
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gold-button px-8 py-3 rounded-xl font-semibold"
                  disabled={!formik.values.bookingType}
                >
                  Next: Special Requests
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Special Requests */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-6 md:p-8"
            >
              <h2 className="text-xl font-cinzel font-bold text-yellow-400 mb-6">Special Requests</h2>

              <div className="mb-6">
                <label className="block text-yellow-400 font-medium mb-3">
                  Special Requirements
                </label>
                <textarea
                  name="specialRequest"
                  value={formik.values.specialRequest}
                  onChange={formik.handleChange}
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 outline-none resize-none"
                  placeholder="Tell us about any special requirements, decorations, catering preferences, or other requests..."
                />
                <div className="text-right text-sm text-gray-400 mt-1">
                  {formik.values.specialRequest.length}/500 characters
                </div>
                {formik.errors.specialRequest && (
                  <div className="text-red-400 text-sm mt-1">{formik.errors.specialRequest}</div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  <FaArrowLeft />
                  Previous
                </motion.button>
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gold-button px-8 py-3 rounded-xl font-semibold"
                >
                  Next: Payment
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-6 md:p-8"
            >
              <h2 className="text-xl font-cinzel font-bold text-yellow-400 mb-6">Payment Method</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Payment Method Selection */}
                <div className="col-span-2">
                  <label className="block text-yellow-400 font-medium mb-4">Select Payment Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${formik.values.paymentMethod === 'physical'
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-yellow-500/30 bg-gray-800 hover:border-yellow-400'
                        }`}
                      onClick={() => formik.setFieldValue('paymentMethod', 'physical')}
                    >
                      <div className="text-center">
                        <div className="text-3xl text-yellow-400 mb-2">🏦</div>
                        <h3 className="font-semibold text-white">Physical Payment</h3>
                        <p className="text-gray-300 text-sm mt-1">Pay at venue</p>
                      </div>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${formik.values.paymentMethod === 'online'
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-yellow-500/30 bg-gray-800 hover:border-yellow-400'
                        }`}
                      onClick={() => formik.setFieldValue('paymentMethod', 'online')}
                    >
                      <div className="text-center">
                        <div className="text-3xl text-yellow-400 mb-2">💳</div>
                        <h3 className="font-semibold text-white">Online Payment</h3>
                        <p className="text-gray-300 text-sm mt-1">Pay now securely</p>
                      </div>
                    </motion.button>
                  </div>
                </div>

                {/* Online Payment Details */}
                {formik.values.paymentMethod === 'online' && (
                  <div className="col-span-2 bg-gray-800/50 rounded-2xl p-6 border border-yellow-500/20">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-4">Online Payment Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-yellow-400 text-sm mb-2">EasyPaisa Number</label>
                        <input
                          type="text"
                          name="easyPaisaNumber"
                          value={formik.values.easyPaisaNumber}
                          onChange={formik.handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm"
                          placeholder="03XX-XXXXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-yellow-400 text-sm mb-2">JazzCash Number</label>
                        <input
                          type="text"
                          name="jazzCashNumber"
                          value={formik.values.jazzCashNumber}
                          onChange={formik.handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm"
                          placeholder="03XX-XXXXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-yellow-400 text-sm mb-2">Bank Account</label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={formik.values.accountNumber}
                          onChange={formik.handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-yellow-500/30 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition-all duration-300 outline-none text-sm"
                          placeholder="Account number"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Status Display */}
                <div className="col-span-2">
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-yellow-400">Payment Status</h4>
                        <p className="text-gray-300 text-sm">
                          {formik.values.paymentMethod === 'physical'
                            ? 'Payment will be collected at the venue. Booking confirmation subject to payment verification.'
                            : 'Online payment will be verified within 24 hours.'
                          }
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${bookingStatus === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}>
                        {bookingStatus === 'pending' ? 'Pending' : 'Confirmed'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  <FaArrowLeft />
                  Previous
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gold-button px-8 py-3 rounded-xl font-semibold"
                  disabled={!formik.values.paymentMethod}
                >
                  Complete Booking
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 md:p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl text-yellow-400 mb-6"
              >
                <FcOk />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-cinzel font-bold gold-gradient mb-4">
                Booking Submitted Successfully!
              </h2>

              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Your booking request has been received. We will process your request within 24 hours and send you a confirmation email. You can track your booking status in your account dashboard.
              </p>

              {/* Booking Summary */}
              <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 max-w-2xl mx-auto border border-yellow-500/20">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">Booking Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-400 text-sm">Event Type</p>
                    <p className="text-white font-medium">{formik.values.eventType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Event Time</p>
                    <p className="text-white font-medium">{formik.values.eventTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Event Date</p>
                    <p className="text-white font-medium">{formik.values.eventDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Amount</p>
                    <p className="text-white font-medium">PKR{formik.values.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gold-button px-6 py-3 rounded-xl font-semibold flex items-center gap-2 justify-center"
                  onClick={() => window.print()}
                >
                  <FaFilePdf />
                  Download Receipt
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 font-semibold"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Home
                </motion.button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>

      {/* Calendar Popup */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCalendar(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-3xl p-6 max-w-md w-full border border-yellow-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-cinzel font-bold text-yellow-400">Select Dates</h3>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-yellow-400 text-sm font-medium py-2">
                    {day}
                  </div>
                ))}
                {renderCalendar()}
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1))}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-white font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1))}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  Next →
                </button>
              </div>

              <button
                onClick={() => setShowCalendar(false)}
                className="w-full gold-button py-3 rounded-xl font-semibold mt-4"
              >
                Confirm Dates
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingSystem;