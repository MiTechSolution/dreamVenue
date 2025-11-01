
"use client";

import { useRef } from 'react';
import jsPDF from 'jspdf';
import { FaDownload, FaTimes } from 'react-icons/fa';

const InvoiceGenerator = ({ booking, isOpen, onClose }) => {
  const invoiceRef = useRef();

  const generatePDF = () => {
    const doc = new jsPDF();
    
    const generatePDF = () => {
        if (!booking) return;
      
        const doc = new jsPDF();
        
        // Colors - Grand Venue Theme
        const primaryColor = [212, 175, 55]; // Gold
        const secondaryColor = [139, 69, 19]; // Brown
        const textColor = [51, 51, 51];
        const lightColor = [250, 250, 250];
      
        // Header with Gold Background
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 35, 'F');
        
        // Title
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.text('GRAND VENUE', 105, 18, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text('LUXURY MARRIAGE HALL & EVENT CENTER', 105, 25, { align: 'center' });
      
        // Invoice Title
        doc.setFontSize(16);
        doc.setTextColor(...secondaryColor);
        doc.text('TAX INVOICE', 105, 40, { align: 'center' });
      
        // Company Info
        doc.setFontSize(9);
        doc.setTextColor(...textColor);
        doc.setFont("helvetica", "normal");
        doc.text('Address: 123 Royal Street, Colaba, Mumbai - 400005', 20, 50);
        doc.text('Phone: +91 22 9876 5432 | Email: info@grandvenue.com', 20, 55);
        doc.text('GSTIN: 27ABCDE1234F1Z5', 20, 60);
      
        // Invoice Details
        doc.text(`Invoice No: INV-${booking.id.toString().padStart(4, '0')}`, 150, 50);
        doc.text(`Invoice Date: ${new Date().toLocaleDateString('en-IN')}`, 150, 55);
        doc.text(`Booking Date: ${new Date(booking.bookingDate).toLocaleDateString('en-IN')}`, 150, 60);
      
        // Customer Details Box
        doc.setFillColor(...lightColor);
        doc.rect(20, 65, 170, 25, 'F');
        doc.setDrawColor(...primaryColor);
        doc.rect(20, 65, 170, 25);
        
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...secondaryColor);
        doc.text('BILL TO:', 25, 72);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...textColor);
        doc.text('Aarav Sharma', 25, 78);
        doc.text('aarav.sharma@email.com | +91 9876543210', 25, 83);
      
        // Line separator
        doc.setDrawColor(...primaryColor);
        doc.line(20, 95, 190, 95);
      
        // Booking Details Table Header
        doc.setFillColor(...primaryColor);
        doc.rect(20, 100, 170, 8, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.text('Description', 25, 105);
        doc.text('Amount (₹)', 165, 105, { align: 'right' });
      
        // Booking Details Rows
        let yPosition = 115;
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...textColor);
        
        // Main Booking
        doc.text(`${booking.eventType} - ${booking.bookingType}`, 25, yPosition);
        doc.text(booking.totalAmount.toLocaleString('en-IN'), 165, yPosition, { align: 'right' });
        yPosition += 6;
        
        // Details
        doc.setFontSize(8);
        doc.text(`Venue: ${booking.venue} | Date: ${new Date(booking.eventDate).toLocaleDateString('en-IN')}`, 25, yPosition);
        yPosition += 4;
        doc.text(`Guests: ${booking.guestCount} | Time: ${booking.eventTime}`, 25, yPosition);
        yPosition += 8;
      
        // Special Requests
        if (booking.specialRequest) {
          doc.setFontSize(7);
          doc.setTextColor(100, 100, 100);
          doc.text(`Special Requests: ${booking.specialRequest}`, 25, yPosition);
          yPosition += 10;
        }
      
        // Amount Breakdown
        doc.setFontSize(9);
        doc.setTextColor(...textColor);
        
        doc.text('Advance Paid:', 120, yPosition);
        doc.text(booking.advancePaid.toLocaleString('en-IN'), 165, yPosition, { align: 'right' });
        yPosition += 6;
      
        doc.text('Balance Amount:', 120, yPosition);
        doc.text(booking.balanceAmount.toLocaleString('en-IN'), 165, yPosition, { align: 'right' });
        yPosition += 8;
      
        // Total Amount
        doc.setFillColor(...secondaryColor);
        doc.rect(120, yPosition, 70, 8, 'F');
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.text('Total Amount:', 125, yPosition + 5);
        doc.text(booking.totalAmount.toLocaleString('en-IN'), 165, yPosition + 5, { align: 'right' });
      
        // Footer
        yPosition += 20;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text('Thank you for choosing Grand Venue for your special occasion!', 105, yPosition, { align: 'center' });
        doc.text('This is a computer generated invoice and does not require signature.', 105, yPosition + 4, { align: 'center' });
        doc.text('For any queries, contact us at: support@grandvenue.com', 105, yPosition + 8, { align: 'center' });
      
        // Save PDF
        doc.save(`grandvenue-invoice-${booking.id}.pdf`);
        onClose(); // Modal close karein
      };
    
    doc.save(`invoice-${booking.id}.pdf`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Download Invoice</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              <FaTimes />
            </button>
          </div>

          {/* Invoice Preview */}
          <div ref={invoiceRef} className="bg-white border-2 border-gold rounded-xl p-6 mb-6">
            <div className="text-center mb-6">
              <h4 className="text-3xl font-bold text-yellow-700">GRAND VENUE</h4>
              <p className="text-gray-900">Marriage Hall & Event Center</p>
              <p className="text-gray-900 text-sm">123 Royal Street, Mumbai</p>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h5 className="font-bold text-gray-900">Customer Details</h5>
                <p className='text-gray-900'>Aarav Sharma</p>
                <p className='text-gray-900'>aarav.sharma@email.com</p>
                <p className='text-gray-900'>+91 9876543210</p>
              </div>
              <div>
                <h5 className="font-bold text-gray-900">Invoice Details</h5>
                <p className='text-gray-900'>Invoice #: INV-{booking.id}</p>
                <p className='text-gray-900'>Date: {new Date().toLocaleDateString()}</p>
                <p className='text-gray-900'>Status: <span className="text-green-600 font-bold">{booking.status}</span></p>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="border-t border-b border-gray-300 py-4 mb-4">
              <h5 className="font-bold text-gray-900 mb-2">Booking Summary</h5>
              <div className="flex justify-between">
                <span className='text-yellow-600'>{booking.eventType} - {booking.bookingType}</span>
                <span className="font-bold text-yellow-400">₹{booking.totalAmount.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-900 mt-1">
                {booking.venue} • {new Date(booking.eventDate).toLocaleDateString()} • {booking.guestCount} Guests
              </div>
            </div>

            {/* Amount Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between text-gray-900 mb-2">
                <span >Total Amount:</span>
                <span className="font-bold">₹{booking.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className='text-gray-900'>Advance Paid:</span>
                <span className="text-green-600">₹{booking.advancePaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-2">
                <span className='text-gray-900 font-bold'>Balance Due:</span>
                <span className="text-red-600 font-bold">₹{booking.balanceAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <button 
            onClick={generatePDF}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaDownload />
            Download Invoice PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;