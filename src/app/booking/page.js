'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  // Validation Schema
  const validationSchema = Yup.object({
    // Step 1
    fullName: Yup.string().required('Full name is required').min(2, 'Full name must be at least 2 characters'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required').matches(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number'),
    
    // Step 2
    eventType: Yup.string().required('Event type is required'),
    eventDate: Yup.date().required('Event date is required').min(new Date(), 'Event date cannot be in the past'),
    guests: Yup.number().required('Number of guests is required').min(1, 'Minimum 1 guest').max(500, 'Maximum 500 guests'),
    eventTime: Yup.string().required('Event time is required'),
    requests: Yup.string(),
    
    // Step 3
    paymentMethod: Yup.string().required('Payment method is required'),
    terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    
    // Card payment validation
    cardNumber: Yup.string().when('paymentMethod', {
      is: 'card',
      then: Yup.string().required('Card number is required').matches(/^[0-9]{13,19}$/, 'Invalid card number')
    }),
    cardHolder: Yup.string().when('paymentMethod', {
      is: 'card',
      then: Yup.string().required('Card holder name is required')
    }),
    expiryMonth: Yup.string().when('paymentMethod', {
      is: 'card',
      then: Yup.string().required('Expiry month is required')
    }),
    expiryYear: Yup.string().when('paymentMethod', {
      is: 'card',
      then: Yup.string().required('Expiry year is required')
    }),
    cvv: Yup.string().when('paymentMethod', {
      is: 'card',
      then: Yup.string().required('CVV is required').matches(/^[0-9]{3,4}$/, 'Invalid CVV')
    }),
    
    // Advance payment validation
    advanceAmount: Yup.number().when('paymentMethod', {
      is: 'advance',
      then: Yup.number().required('Advance amount is required').min(100, 'Minimum advance is $100')
    }),
    paymentNotes: Yup.string()
  });

  const initialValues = {
    // Step 1
    fullName: '',
    email: '',
    phone: '',
    
    // Step 2
    eventType: '',
    eventDate: '',
    guests: '',
    eventTime: '',
    requests: '',
    
    // Step 3
    paymentMethod: 'card',
    terms: false,
    
    // Card details
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    
    // Advance payment
    advanceAmount: '',
    paymentNotes: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const bookingData = {
      ...values,
      bookingId: generateBookingId(),
      submittedAt: new Date().toISOString()
    };

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
    }

    // Redirect to confirmation
    router.push('/confirmation');
    setSubmitting(false);
  };

  const generateBookingId = () => {
    return 'GV' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  };

  const calculateEstimatedCost = (guests) => {
    const baseCost = 5000;
    const guestCost = guests * 50;
    return baseCost + guestCost;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-cinzel font-bold gold-gradient">GrandVenue Hall</a>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-yellow-400 transition-colors">Home</a>
            <a href="/about" className="hover:text-yellow-400 transition-colors">About</a>
            <a href="/booking" className="hover:text-yellow-400 transition-colors">Book Now</a>
          </div>
          <a href="/booking" className="gold-button px-6 py-2 rounded-full font-medium">Book Now</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-cinzel font-bold mb-6 fade-in">
            <span className="gold-gradient">Book Your Event</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Reserve our luxurious venue for your special occasion. Complete the form below and we'll contact you within 24 hours.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-12">
              <div className="flex justify-between items-center relative">
                {[1, 2, 3].map((step) => (
                  <div key={step} className={`progress-step ${currentStep >= step ? 'completed' : ''} ${currentStep === step ? 'active' : ''}`}>
                    <div className="step-icon">
                      <i className={`fas ${step === 1 ? 'fa-user' : step === 2 ? 'fa-calendar-alt' : 'fa-credit-card'}`}></i>
                    </div>
                    <div className="step-label">
                      {step === 1 ? 'Personal Info' : step === 2 ? 'Event Details' : 'Payment'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form className="bg-gray-900/50 rounded-xl p-8 gold-border">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="step active">
                      <h2 className="text-2xl font-cinzel font-bold mb-6 gold-gradient">Personal Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label htmlFor="fullName" className="block text-gray-300 mb-2">Full Name *</label>
                          <Field
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter your full name"
                          />
                          <ErrorMessage name="fullName" component="div" className="error-message" />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-gray-300 mb-2">Email Address *</label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter your email address"
                          />
                          <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-gray-300 mb-2">Phone Number *</label>
                          <Field
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter your phone number"
                          />
                          <ErrorMessage name="phone" component="div" className="error-message" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-8">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="gold-button px-6 py-3 rounded-lg font-medium"
                          disabled={!!errors.fullName || !!errors.email || !!errors.phone}
                        >
                          Next <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Event Information */}
                  {currentStep === 2 && (
                    <div className="step active">
                      <h2 className="text-2xl font-cinzel font-bold mb-6 gold-gradient">Event Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="eventType" className="block text-gray-300 mb-2">Event Type *</label>
                          <Field
                            as="select"
                            id="eventType"
                            name="eventType"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          >
                            <option value="">Select Event Type</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Engagement">Engagement</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Corporate">Corporate Event</option>
                            <option value="Conference">Conference</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage name="eventType" component="div" className="error-message" />
                        </div>
                        
                        <div>
                          <label htmlFor="eventDate" className="block text-gray-300 mb-2">Event Date *</label>
                          <Field
                            type="date"
                            id="eventDate"
                            name="eventDate"
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                          <ErrorMessage name="eventDate" component="div" className="error-message" />
                        </div>
                        
                        <div>
                          <label htmlFor="guests" className="block text-gray-300 mb-2">Number of Guests *</label>
                          <Field
                            type="number"
                            id="guests"
                            name="guests"
                            min="1"
                            max="500"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                          <ErrorMessage name="guests" component="div" className="error-message" />
                        </div>
                        
                        <div>
                          <label htmlFor="eventTime" className="block text-gray-300 mb-2">Event Time *</label>
                          <Field
                            as="select"
                            id="eventTime"
                            name="eventTime"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          >
                            <option value="">Select Time</option>
                            <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                            <option value="Afternoon (1PM-4PM)">Afternoon (1PM-4PM)</option>
                            <option value="Evening (6PM-9PM)">Evening (6PM-9PM)</option>
                            <option value="Full Day (9AM-9PM)">Full Day (9AM-9PM)</option>
                          </Field>
                          <ErrorMessage name="eventTime" component="div" className="error-message" />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="requests" className="block text-gray-300 mb-2">Special Requests</label>
                          <Field
                            as="textarea"
                            id="requests"
                            name="requests"
                            rows="4"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Tell us about any special requirements or preferences..."
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-8">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="bg-gray-800 text-white px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors font-medium"
                        >
                          <i className="fas fa-arrow-left mr-2"></i> Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="gold-button px-6 py-3 rounded-lg font-medium"
                          disabled={!!errors.eventType || !!errors.eventDate || !!errors.guests || !!errors.eventTime}
                        >
                          Next <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment Information */}
                  {currentStep === 3 && (
                    <div className="step active">
                      <h2 className="text-2xl font-cinzel font-bold mb-6 gold-gradient">Payment Information</h2>
                      
                      {/* Booking Summary */}
                      <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-yellow-400">Booking Summary</h3>
                        <div className="text-gray-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between py-2 border-b border-gray-700">
                              <span className="text-gray-400">Client:</span>
                              <span className="font-medium">{values.fullName}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-700">
                              <span className="text-gray-400">Event Type:</span>
                              <span className="font-medium">{values.eventType}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-700">
                              <span className="text-gray-400">Event Date:</span>
                              <span className="font-medium">
                                {values.eventDate ? new Date(values.eventDate).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                }) : 'N/A'}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-700">
                              <span className="text-gray-400">Event Time:</span>
                              <span className="font-medium">{values.eventTime}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-700">
                              <span className="text-gray-400">Number of Guests:</span>
                              <span className="font-medium">{values.guests}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-700">
                              <span className="text-gray-400">Estimated Total:</span>
                              <span className="font-medium">${calculateEstimatedCost(parseInt(values.guests) || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-700 md:col-span-2">
                              <span className="text-gray-400">Advance Required (30%):</span>
                              <span className="font-medium text-yellow-400">
                                ${(calculateEstimatedCost(parseInt(values.guests) || 0) * 0.3).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Payment Method */}
                        <div className="md:col-span-2">
                          <label className="block text-gray-300 mb-4">Payment Method *</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Field
                                type="radio"
                                id="cardPayment"
                                name="paymentMethod"
                                value="card"
                                className="hidden peer"
                              />
                              <label htmlFor="cardPayment" className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-yellow-400 peer-checked:bg-yellow-400/10 transition-colors">
                                <i className="fas fa-credit-card text-yellow-400 mr-3 text-xl"></i>
                                <span>Credit/Debit Card</span>
                              </label>
                            </div>
                            <div>
                              <Field
                                type="radio"
                                id="advancePayment"
                                name="paymentMethod"
                                value="advance"
                                className="hidden peer"
                              />
                              <label htmlFor="advancePayment" className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-yellow-400 peer-checked:bg-yellow-400/10 transition-colors">
                                <i className="fas fa-money-bill-wave text-yellow-400 mr-3 text-xl"></i>
                                <span>Advance Payment</span>
                              </label>
                            </div>
                          </div>
                          <ErrorMessage name="paymentMethod" component="div" className="error-message" />
                        </div>

                        {/* Card Details */}
                        {values.paymentMethod === 'card' && (
                          <div className="md:col-span-2 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="cardNumber" className="block text-gray-300 mb-2">Card Number *</label>
                                <Field
                                  type="text"
                                  id="cardNumber"
                                  name="cardNumber"
                                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                  placeholder="1234 5678 9012 3456"
                                />
                                <ErrorMessage name="cardNumber" component="div" className="error-message" />
                              </div>
                              <div>
                                <label htmlFor="cardHolder" className="block text-gray-300 mb-2">Card Holder Name *</label>
                                <Field
                                  type="text"
                                  id="cardHolder"
                                  name="cardHolder"
                                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                  placeholder="John Doe"
                                />
                                <ErrorMessage name="cardHolder" component="div" className="error-message" />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <label htmlFor="expiryMonth" className="block text-gray-300 mb-2">Expiry Month *</label>
                                <Field
                                  as="select"
                                  id="expiryMonth"
                                  name="expiryMonth"
                                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                  <option value="">Month</option>
                                  {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                                      {(i + 1).toString().padStart(2, '0')}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage name="expiryMonth" component="div" className="error-message" />
                              </div>
                              <div>
                                <label htmlFor="expiryYear" className="block text-gray-300 mb-2">Expiry Year *</label>
                                <Field
                                  as="select"
                                  id="expiryYear"
                                  name="expiryYear"
                                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                  <option value="">Year</option>
                                  {Array.from({ length: 6 }, (_, i) => (
                                    <option key={i} value={(new Date().getFullYear() + i).toString()}>
                                      {new Date().getFullYear() + i}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage name="expiryYear" component="div" className="error-message" />
                              </div>
                              <div>
                                <label htmlFor="cvv" className="block text-gray-300 mb-2">CVV *</label>
                                <Field
                                  type="text"
                                  id="cvv"
                                  name="cvv"
                                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                  placeholder="123"
                                />
                                <ErrorMessage name="cvv" component="div" className="error-message" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Advance Payment Details */}
                        {values.paymentMethod === 'advance' && (
                          <div className="md:col-span-2 space-y-4">
                            <div>
                              <label htmlFor="advanceAmount" className="block text-gray-300 mb-2">Advance Amount *</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-400">$</span>
                                </div>
                                <Field
                                  type="number"
                                  id="advanceAmount"
                                  name="advanceAmount"
                                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                  placeholder="500.00"
                                  min="100"
                                />
                              </div>
                              <ErrorMessage name="advanceAmount" component="div" className="error-message" />
                              <p className="text-gray-400 text-sm mt-2">Minimum advance payment is $100. The remaining amount will be due 30 days before your event.</p>
                            </div>
                            <div>
                              <label htmlFor="paymentNotes" className="block text-gray-300 mb-2">Payment Instructions</label>
                              <p className="text-gray-400 text-sm mb-2">Please transfer the advance amount to our bank account and provide the transaction details below:</p>
                              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                                <p className="text-gray-300"><strong>Bank:</strong> Luxury Bank International</p>
                                <p className="text-gray-300"><strong>Account Name:</strong> GrandVenue Hall</p>
                                <p className="text-gray-300"><strong>Account Number:</strong> 1234 5678 9012 3456</p>
                                <p className="text-gray-300"><strong>Routing Number:</strong> 021000021</p>
                              </div>
                              <Field
                                as="textarea"
                                id="paymentNotes"
                                name="paymentNotes"
                                rows="3"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Please provide transaction reference or any payment notes..."
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Terms and Conditions */}
                      <div className="mt-6">
                        <div className="flex items-start">
                          <Field
                            type="checkbox"
                            id="terms"
                            name="terms"
                            className="mt-1 mr-3 rounded focus:ring-yellow-400 text-yellow-400 bg-gray-800 border-gray-700"
                          />
                          <label htmlFor="terms" className="text-gray-300 text-sm">
                            I agree to the <a href="#" className="text-yellow-400 hover:underline">Terms and Conditions</a> and understand that my booking is subject to availability confirmation.
                          </label>
                        </div>
                        <ErrorMessage name="terms" component="div" className="error-message" />
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex justify-between mt-8">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="bg-gray-800 text-white px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors font-medium"
                        >
                          <i className="fas fa-arrow-left mr-2"></i> Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="gold-button px-6 py-3 rounded-lg font-medium"
                        >
                          {isSubmitting ? 'Processing...' : 'Confirm Booking'} <i className="fas fa-check ml-2"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BookingPage;