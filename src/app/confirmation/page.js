'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const ConfirmationPage = () => {
  const [bookingData, setBookingData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('bookingData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      // Redirect to booking if no data found
      router.push('/booking');
    }
  }, [router]);

  const handlePrint = () => {
    window.print();
  };

  const generatePDF = () => {
    // In a real implementation, you would use a PDF generation library
    // For now, we'll use the browser's print functionality
    window.print();
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  const formattedDate = bookingData.eventDate 
    ? new Date(bookingData.eventDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <>
      <Head>
        <title>Booking Confirmation | GrandVenue Hall</title>
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm py-4 print:hidden">
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

        {/* Confirmation Section */}
        <section className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-black via-gray-900 to-black print:bg-white print:pt-0">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center fade-in">
              <div className="text-yellow-400 text-6xl mb-6">
                <i className="fas fa-check-circle"></i>
              </div>
              <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-6">
                <span className="gold-gradient">Booking Confirmed!</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 print:text-black">
                Thank you for choosing GrandVenue Hall. Your event has been successfully booked.
              </p>
            </div>
            
            {/* Confirmation Card */}
            <div className="max-w-3xl mx-auto mt-12 fade-in">
              <div className="bg-gray-900/50 rounded-xl p-8 gold-border print:bg-white print:border-gray-300">
                <h2 className="text-2xl font-cinzel font-bold mb-6 text-center gold-gradient print:text-black">
                  Booking Details
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-700 print:border-gray-300">
                      <span className="text-gray-400 print:text-gray-600">Booking ID:</span>
                      <span className="font-medium">{bookingData.bookingId}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700 print:border-gray-300">
                      <span className="text-gray-400 print:text-gray-600">Event Type:</span>
                      <span className="font-medium">{bookingData.eventType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700 print:border-gray-300">
                      <span className="text-gray-400 print:text-gray-600">Full Name:</span>
                      <span className="font-medium">{bookingData.fullName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700 print:border-gray-300">
                      <span className="text-gray-400 print:text-gray-600">Email:</span>
                      <span className="font-medium">{bookingData.email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700 print:border-gray-300">
                      <span className="text-gray-400 print:text-gray-600">Phone:</span>
                      <span className="font-medium">{bookingData.phone}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700 print:border-gray-300">
                      <span className="text-gray-400 print:text-gray-600">Event Date:</span>
                      <span className="font-medium">{formattedDate}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700 print:border-gray-300">
                      <span className="text-gray-400 print:text-gray-600">Event Time:</span>
                      <span className="font-medium">{bookingData.eventTime}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700 print:border-gray-300">
                      <span className="text-gray-400 print:text-gray-600">Number of Guests:</span>
                      <span className="font-medium">{bookingData.guests}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700 print:border-gray-300 md:col-span-2">
                      <span className="text-gray-400 print:text-gray-600">Payment Method:</span>
                      <span className="font-medium">
                        {bookingData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Advance Payment'}
                      </span>
                    </div>
                  </div>
                  
                  {bookingData.requests && (
                    <div className="mt-4">
                      <div className="text-gray-400 print:text-gray-600 mb-2">Special Requests:</div>
                      <div className="bg-gray-800 rounded-lg p-4 print:bg-gray-100">
                        {bookingData.requests}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-700 print:border-gray-300">
                  <p className="text-gray-400 text-center print:text-gray-600">
                    A confirmation email has been sent to your email address. 
                    Our event coordinator will contact you within 24 hours to discuss next steps.
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 print:hidden">
                <button
                  onClick={generatePDF}
                  className="gold-button px-6 py-3 rounded-full font-medium"
                >
                  <i className="fas fa-file-pdf mr-2"></i> Generate PDF
                </button>
                <button
                  onClick={handlePrint}
                  className="gold-button px-6 py-3 rounded-full font-medium"
                >
                  <i className="fas fa-print mr-2"></i> Print Confirmation
                </button>
                <a
                  href="/"
                  className="bg-gray-800 text-white px-6 py-3 rounded-full font-medium border border-gray-700 hover:bg-gray-700 transition-colors text-center"
                >
                  <i className="fas fa-home mr-2"></i> Back to Home
                </a>
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          .gold-gradient {
            background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #CFB53B 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .gold-button {
            background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #CFB53B 100%);
            color: #000;
            transition: all 0.3s ease;
          }
          .gold-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
          }
          .gold-border {
            border: 1px solid #D4AF37;
          }
          .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 0.8s ease forwards;
          }
          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Print Styles */
          @media print {
            .print\\:hidden {
              display: none !important;
            }
            .print\\:bg-white {
              background: white !important;
            }
            .print\\:pt-0 {
              padding-top: 0 !important;
            }
            .print\\:text-black {
              color: black !important;
            }
            .print\\:border-gray-300 {
              border-color: #d1d5db !important;
            }
            .print\\:text-gray-600 {
              color: #4b5563 !important;
            }
            .print\\:bg-gray-100 {
              background: #f3f4f6 !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default ConfirmationPage;