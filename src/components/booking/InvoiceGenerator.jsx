// components/InvoiceGenerator.js
"use client";

import { useRef } from 'react';
import jsPDF from 'jspdf';
import { FaDownload, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaStar, FaRupeeSign } from 'react-icons/fa';

const InvoiceGenerator = ({ booking, isOpen, onClose }) => {
  const invoiceRef = useRef();

  const generatePDF = () => {
    if (!booking) return;

    try {
      const doc = new jsPDF();
      
      // Colors - Grand Venue Theme
      const goldColor = [212, 175, 55];
      const darkColor = [30, 30, 30];
      const textColor = [51, 51, 51];
      const lightGold = [255, 248, 225];

      // Header with Gold Gradient
      doc.setFillColor(...goldColor);
      doc.rect(0, 0, 210, 50, 'F');
      
      // Logo/Title Area
      doc.setFontSize(24);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text('GRAND VENUE', 105, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text('LUXURY WEDDINGS & EVENTS', 105, 28, { align: 'center' });
      doc.text('INVOICE', 105, 35, { align: 'center' });

      // Company Details
      doc.setFontSize(9);
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "normal");
      doc.text('123 Royal Street, Colaba, Mumbai - 400005', 20, 60);
      doc.text('+91 22 9876 5432 • info@grandvenue.com', 20, 65);
      doc.text('GSTIN: 27ABCDE1234F1Z5', 20, 70);

      // Invoice Details
      doc.setFont("helvetica", "bold");
      doc.text(`INVOICE NO: INV-${booking.id.toString().padStart(4, '0')}`, 150, 60);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 150, 65);
      doc.text(`Booking Date: ${new Date(booking.bookingDate).toLocaleDateString('en-IN')}`, 150, 70);

      // Customer Details Box
      doc.setFillColor(...lightGold);
      doc.roundedRect(20, 80, 170, 30, 3, 3, 'F');
      doc.setDrawColor(...goldColor);
      doc.roundedRect(20, 80, 170, 30, 3, 3);
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkColor);
      doc.text('BILLED TO:', 25, 88);
      
      doc.setFont("helvetica", "normal");
      doc.text('Aarav Sharma', 25, 95);
      doc.text('aarav.sharma@email.com • +91 9876543210', 25, 102);

      // Event Details Section
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...goldColor);
      doc.text('EVENT DETAILS', 20, 120);
      doc.setDrawColor(...goldColor);
      doc.line(20, 122, 80, 122);

      let yPos = 130;

      // Event Type
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkColor);
      doc.text('Event Type:', 25, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(booking.eventType, 70, yPos);
      yPos += 7;

      // Venue
      doc.setFont("helvetica", "bold");
      doc.text('Venue:', 25, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(booking.venue, 70, yPos);
      yPos += 7;

      // Date & Time
      doc.setFont("helvetica", "bold");
      doc.text('Date & Time:', 25, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(`${new Date(booking.eventDate).toLocaleDateString('en-IN')} • ${booking.eventTime}`, 70, yPos);
      yPos += 7;

      // Guests
      doc.setFont("helvetica", "bold");
      doc.text('Guests:', 25, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(booking.guestCount.toString(), 70, yPos);
      yPos += 7;

      // Package
      doc.setFont("helvetica", "bold");
      doc.text('Package:', 25, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(booking.bookingType, 70, yPos);
      yPos += 10;

      // Special Requests
      if (booking.specialRequest) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...goldColor);
        doc.text('SPECIAL REQUESTS:', 25, yPos);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...textColor);
        const requests = doc.splitTextToSize(booking.specialRequest, 160);
        doc.text(requests, 25, yPos + 5);
        yPos += (requests.length * 4) + 10;
      }

      // Pricing Table Header
      doc.setFillColor(...goldColor);
      doc.rect(20, yPos, 170, 8, 'F');
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text('DESCRIPTION', 25, yPos + 5);
      doc.text('AMOUNT (₹)', 165, yPos + 5, { align: 'right' });

      yPos += 12;

      // Main Package
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkColor);
      doc.text(`${booking.eventType} - ${booking.bookingType}`, 25, yPos);
      doc.text(booking.totalAmount.toLocaleString('en-IN'), 165, yPos, { align: 'right' });
      yPos += 15;

      // Amount Breakdown
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);
      
      doc.text('Advance Paid:', 120, yPos);
      doc.text(booking.advancePaid.toLocaleString('en-IN'), 165, yPos, { align: 'right' });
      yPos += 6;

      doc.text('Balance Amount:', 120, yPos);
      doc.text(booking.balanceAmount.toLocaleString('en-IN'), 165, yPos, { align: 'right' });
      yPos += 10;

      // Total Amount Box
      doc.setFillColor(...darkColor);
      doc.rect(120, yPos, 70, 10, 'F');
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text('TOTAL AMOUNT:', 125, yPos + 6);
      doc.text(`₹${booking.totalAmount.toLocaleString('en-IN')}`, 165, yPos + 6, { align: 'right' });

      yPos += 20;

      // Payment Method
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...goldColor);
      doc.text('PAYMENT METHOD:', 25, yPos);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);
      doc.text(booking.paymentMethod, 70, yPos);
      yPos += 10;

      // Status
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...goldColor);
      doc.text('BOOKING STATUS:', 25, yPos);
      doc.setFont("helvetica", "normal");
      
      // Status with color coding
      let statusColor = [0, 0, 0];
      if (booking.status === 'accepted') statusColor = [0, 128, 0];
      else if (booking.status === 'pending') statusColor = [255, 165, 0];
      else statusColor = [255, 0, 0];
      
      doc.setTextColor(...statusColor);
      doc.text(booking.status.toUpperCase(), 70, yPos);
      yPos += 15;

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('Thank you for choosing Grand Venue for your special occasion!', 105, yPos, { align: 'center' });
      doc.text('This is a computer generated invoice and does not require signature.', 105, yPos + 4, { align: 'center' });
      doc.text('For any queries, please contact: support@grandvenue.com | +91 22 9876 5432', 105, yPos + 8, { align: 'center' });

      // Terms and Conditions
    //   yPos += 20;
    //   doc.setFont("helvetica", "bold");
    //   doc.setTextColor(...goldColor);
    //   doc.text('Terms & Conditions:', 20, yPos);
    //   doc.setFont("helvetica", "normal");
    //   doc.setFontSize(7);
    //   doc.setTextColor(...textColor);
      
    //   const terms = [
    //     '• 50% advance required at time of booking',
    //     '• Balance to be paid 7 days before the event',
    //     '• Cancellation charges apply as per policy',
    //     '• Special requests subject to availability',
    //     '• GST included in all prices'
    //   ];
      
    //   terms.forEach((term, index) => {
    //     doc.text(term, 25, yPos + 5 + (index * 3));
    //   });

      // Save PDF
      doc.save(`grand-venue-invoice-${booking.id}.pdf`);
      onClose();
      
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gold/20">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Download Invoice</h3>
              <p className="text-gray-600">Preview your invoice before downloading</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Invoice Preview - Exact same design as PDF */}
          <div className="bg-white border-2 border-gold rounded-xl p-6 mb-6 shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-black to-yellow-500 text-white rounded-t-lg py-4 px-6 -mx-6 -mt-6 mb-6">
              <h2 className="text-2xl font-bold text-center">GRAND VENUE</h2>
              <p className="text-center text-yellow-100 text-sm">LUXURY WEDDINGS & EVENTS</p>
              <p className="text-center text-yellow-100 font-bold mt-1">INVOICE</p>
            </div>

            {/* Company & Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Grand Venue</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gold" />
                    123 Royal Street, Colaba, Mumbai
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-gold" />
                    +91 22 9876 5432
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-gold" />
                    info@grandvenue.com
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <h4 className="font-bold text-gray-800 mb-2">Invoice Details</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Invoice #: INV-{booking.id.toString().padStart(4, '0')}</p>
                  <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
                  <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-gradient-to-r from-black to-yellow-500 border border-yellow-600/30 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-gray-300 mb-2">Billed To</h4>
              <p className="font-semibold">Aarav Sharma</p>
              <p className="text-sm text-gray-400">aarav.sharma@email.com • +91 9876543210</p>
            </div>

            {/* Event Details */}
            <div className="mb-6">
              <h4 className="font-bold text-yellow-600 text-lg border-b border-yellow-500/30 pb-2 mb-4">Event Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 text-gray-900 gap-4">
                <div>
                  <p><span className="font-semibold">Event Type:</span> {booking.eventType}</p>
                  <p><span className="font-semibold">Venue:</span> {booking.venue}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Date & Time:</span> {new Date(booking.eventDate).toLocaleDateString('en-IN')} • {booking.eventTime}</p>
                  <p><span className="font-semibold">Guests:</span> {booking.guestCount}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-900"><span className="font-semibold">Package:</span> {booking.bookingType}</p>
              
              {booking.specialRequest && (
                <div className="mt-4">
                  <p className="font-semibold text-yellow-600">Special Requests:</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-1">
                    {booking.specialRequest}
                  </p>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="bg-yellow-600 text-white px-4 py-3 font-bold">
                <div className="flex  justify-between">
                  <span>DESCRIPTION</span>
                  <span>AMOUNT (₹)</span>
                </div>
              </div>
              
              {/* Package */}
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="text-gray-900 flex justify-between">
                  <span className="font-semibold">{booking.eventType} - {booking.bookingType}</span>
                  <span className="font-bold">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              {/* Amount Breakdown */}
              <div className="px-4 py-3 space-y-2 bg-gray-50">
                <div className="flex justify-between">
                  <span className='text-gray-900'>Advance Paid:</span>
                  <span className="text-green-600">₹{booking.advancePaid.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className='text-gray-900'>Balance Amount:</span>
                  <span className="text-red-600">₹{booking.balanceAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              {/* Total */}
              <div className="bg-black text-white px-4 py-3 font-bold">
                <div className="flex justify-between">
                  <span>TOTAL AMOUNT</span>
                  <span>₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Payment & Status */}
            <div className="grid grid-cols-1 text-gray-900 md:grid-cols-2 gap-4 mt-6 text-sm">
              <div>
                <span className="font-semibold ">Payment Method:</span> {booking.paymentMethod}
              </div>
              <div>
                <span className="font-semibold">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                  booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <button 
            onClick={generatePDF}
            className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-green-500/20 text-lg"
          >
            <FaDownload className="text-xl" />
            Download  Invoice PDF
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;