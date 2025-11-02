"use client";

  import { useState, useEffect } from "react";
  import Image from "next/image";
  import {
    FaSearch, FaFilter, FaCalendarAlt, FaUser, FaRupeeSign, FaReceipt,
    FaCheckCircle, FaTimesCircle, FaClock, FaEye, FaEdit, FaDownload,
    FaChevronLeft, FaChevronRight, FaPhone, FaEnvelope, FaCrown,
    FaMapMarkerAlt, FaStar, FaUsers
  } from "react-icons/fa";
  import BackButton from "../BackButton";
  import Navbar from "../home/Navbar";
  import InvoiceGenerator from "./InvoiceGenerator";
  
  const MyBookings = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(10);
    const [bookingsData, setBookingsData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [selectedBookingForInvoice, setSelectedBookingForInvoice] = useState(null);
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          setLoading(true);
          await new Promise(resolve => setTimeout(resolve, 800));
  
          const data = {
            userInfo: {
              name: "Aarav Sharma",
              email: "aarav.sharma@email.com",
              phone: "+91 9876543210",
              totalBookings: 8
            },
            bookings: [
              { 
                id: 1, 
                eventType: "Wedding Reception", 
                eventTime: "07:00 PM", 
                eventDate: "2024-03-15", 
                bookingType: "Royal Package", 
                guestCount: 250, 
                totalAmount: 325000, 
                specialRequest: "Rose petal decoration, live shehnai, vegetarian royal cuisine", 
                paymentMethod: "Credit Card", 
                status: "accepted", 
                bookingDate: "2024-01-10 14:30:00", 
                venue: "Crystal Ballroom", 
                advancePaid: 150000, 
                balanceAmount: 175000 
              },
              { 
                id: 2, 
                eventType: "Engagement Ceremony", 
                eventTime: "06:30 PM", 
                eventDate: "2024-03-20", 
                bookingType: "Elite Package", 
                guestCount: 150, 
                totalAmount: 185000, 
                specialRequest: "Jain food, floral mandap, traditional decorations", 
                paymentMethod: "UPI", 
                status: "pending", 
                bookingDate: "2024-01-12 11:20:00", 
                venue: "Garden Pavilion", 
                advancePaid: 75000, 
                balanceAmount: 110000 
              },
              { 
                id: 3, 
                eventType: "Birthday Party", 
                eventTime: "08:00 PM", 
                eventDate: "2024-03-25", 
                bookingType: "Premium Package", 
                guestCount: 100, 
                totalAmount: 125000, 
                specialRequest: "DJ night, chocolate fountain, theme decoration", 
                paymentMethod: "Debit Card", 
                status: "rejected", 
                bookingDate: "2024-01-08 16:45:00", 
                venue: "Poolside Venue", 
                advancePaid: 60000, 
                balanceAmount: 65000 
              },
              { 
                id: 4, 
                eventType: "Corporate Event", 
                eventTime: "07:30 PM", 
                eventDate: "2024-04-05", 
                bookingType: "Business Package", 
                guestCount: 200, 
                totalAmount: 225000, 
                specialRequest: "Projector, sound system, formal seating arrangement", 
                paymentMethod: "Bank Transfer", 
                status: "accepted", 
                bookingDate: "2024-01-15 09:15:00", 
                venue: "Grand Conference Hall", 
                advancePaid: 100000, 
                balanceAmount: 125000 
              },
              { 
                id: 5, 
                eventType: "Anniversary Party", 
                eventTime: "07:00 PM", 
                eventDate: "2024-04-12", 
                bookingType: "Royal Package", 
                guestCount: 80, 
                totalAmount: 95000, 
                specialRequest: "Golden theme, special cake arrangement, photo booth", 
                paymentMethod: "Cash", 
                status: "pending", 
                bookingDate: "2024-01-18 13:40:00", 
                venue: "Royal Suite", 
                advancePaid: 40000, 
                balanceAmount: 55000 
              }
            ]
          };
  
          setBookingsData(data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }, []);
  
    // Invoice download handler
    const handleDownloadInvoice = (booking) => {
      setSelectedBookingForInvoice(booking);
      setShowInvoiceModal(true);
    };
  
    // Modal close handler
    const handleCloseInvoiceModal = () => {
      setShowInvoiceModal(false);
      setSelectedBookingForInvoice(null);
    };
  
    if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-700 to-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold text-lg">Loading your royal bookings...</p>
        </div>
      </div>
    );
  
    if (!bookingsData) return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-rose-50">
        <p className="text-red-400 text-lg">Failed to load bookings</p>
      </div>
    );
  
    const { userInfo, bookings } = bookingsData;
  
    const filteredBookings = bookings.filter(booking => {
      const matchesSearch =
        booking.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.venue.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredBookings.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(filteredBookings.length / entriesPerPage);
  
    const StatusBadge = ({ status }) => {
      const statusConfig = {
        pending: { 
          bg: "bg-yellow-100", 
          text: "text-yellow-800", 
          border: "border-yellow-200",
          icon: FaClock, 
          label: "Under Review" 
        },
        accepted: { 
          bg: "bg-green-100", 
          text: "text-green-800", 
          border: "border-green-200",
          icon: FaCheckCircle, 
          label: "Confirmed" 
        },
        rejected: { 
          bg: "bg-red-100", 
          text: "text-red-800", 
          border: "border-red-200",
          icon: FaTimesCircle, 
          label: "Declined" 
        }
      };
      const config = statusConfig[status];
      const Icon = config.icon;
      return (
        <span className={`${config.bg} ${config.text} ${config.border} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 border`}>
          <Icon className="text-xs" />
          {config.label}
        </span>
      );
    };
  
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-IN", { 
      day: "numeric", 
      month: "short", 
      year: "numeric" 
    });
  
    const formatAmount = (amount) => `₹${amount.toLocaleString("en-IN")}`;
  
    const Pagination = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
  
      return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
          <div className="text-gray-600 text-sm">
            Showing {indexOfFirstEntry + 1}-{Math.min(indexOfLastEntry, filteredBookings.length)} of {filteredBookings.length} bookings
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white text-black border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <FaChevronLeft />
            </button>
            
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`w-10 h-10 cursor-pointer rounded-lg text-black transition-all duration-300 border font-medium ${
                  currentPage === number 
                    ? 'bg-gold text-white border-gold shadow-lg' 
                    : 'bg-white border-gray-300 text-gray-600'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 cursor-pointer rounded-lg bg-white border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-gold transition-all duration-300"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      );
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        {/* Background Image with Overlay */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70">
            <Image
              src="/images/main.jpg"
              alt="GrandVenue Hall"
              fill
              className="object-cover mix-blend-overlay"
              priority
            />
          </div>
        </div>
        
        <Navbar/>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center py-24">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-black/80 via-black/60 to-black/90 rounded-2xl flex items-center justify-center shadow-lg">
                <FaCrown className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-black font-cinzel">My Royal Bookings</h1>
                <p className="text-gray-900 mt-2">Your journey of celebrations with Grand Venue</p>
              </div>
            </div>
          </div>
  
          {/* User Info Card */}
          <div className="bg-gradient-to-br from-black/80 via-black/60 to-black/90 backdrop-blur-sm rounded-2xl border border-gold/30 p-6 mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-r from-gold to-yellow-500 rounded-2xl flex items-center justify-center">
                  <FaUser className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{userInfo.name}</h2>
                  <div className="flex flex-col sm:flex-row gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-white" />
                      <span className="text-white">{userInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-white" />
                      <span className="text-white">{userInfo.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gold to-yellow-500 rounded-xl px-6 py-3 border border-gold/20">
                <p className="text-white font-bold text-lg text-center">
                  {userInfo.totalBookings} Active Booking{userInfo.totalBookings !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
  
          {/* Search & Filter Section */}
          <div className="bg-gradient-to-br from-black/80 via-black/60 to-black/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 mb-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search events, venue, type..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                />
              </div>
  
              {/* Filter Dropdown */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaFilter className="text-gray-400 w-5 h-5" />
                </div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 appearance-none"
                >      
                  <option value="all">All Status</option>
                  <option value="pending">Under Review</option>
                  <option value="accepted">Confirmed</option>
                  <option value="rejected">Declined</option>
                </select>
              </div>
  
              {/* Stats Card */}
              <div className="bg-gradient-to-r from-gold to-yellow-500 rounded-xl p-4 border border-gold/20 text-center">
                <p className="text-white font-bold text-2xl">{filteredBookings.length}</p>
                <p className="text-white text-sm">Total Bookings</p>
              </div>
            </div>
          </div>
  
          {/* Bookings Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 border-b border-gray-200">
              <div className="hidden md:grid md:grid-cols-12 gap-4 p-6 text-sm font-semibold text-gray-700">
                <div className="col-span-3">Event Details</div>
                <div className="col-span-2">Date & Venue</div>
                <div className="col-span-1 text-center">Guests</div>
                <div className="col-span-2">Package & Amount</div>
                <div className="col-span-2">Payment Status</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
            </div>
  
            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {currentEntries.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCalendarAlt className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-600 text-lg mb-2">No bookings found</p>
                  <p className="text-gray-500">Try changing your search criteria</p>
                </div>
              ) : currentEntries.map(booking => (
                <div key={booking.id} className="hover:bg-gradient-to-br from-black/80 via-black/60 to-black/90 booking-text transition-all duration-100">
                  
                  {/* Desktop Table Row */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 p-6 items-center">
                    
                    {/* Event Details */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-gold to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                          <FaStar className="text-white text-sm" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{booking.eventType}</h3>
                          <p className="text-sm">{booking.bookingType}</p>
                        </div>
                      </div>
                    </div>
  
                    {/* Date & Venue */}
                    <div className="col-span-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gold text-sm" />
                          <span className="text-sm">{formatDate(booking.eventDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaMapMarkerAlt className="text-gold text-sm" />
                          <span>{booking.venue}</span>
                        </div>
                        <p className="text-xs">{booking.eventTime}</p>
                      </div>
                    </div>
  
                    {/* Guests */}
                    <div className="col-span-1 text-center">
                      <div className="bg-blue-50 rounded-lg py-2 border border-blue-200">
                        <p className="text-blue-800 font-bold text-lg">{booking.guestCount}</p>
                        <p className="text-blue-600 text-xs">Guests</p>
                      </div>
                    </div>
  
                    {/* Package & Amount */}
                    <div className="col-span-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 font-semibold">
                          <FaRupeeSign className="text-gold" />
                          <span className="text-lg">{formatAmount(booking.totalAmount)}</span>
                        </div>
                        <p className="text-sm">Advance: {formatAmount(booking.advancePaid)}</p>
                        <p className="text-xs">Balance: {formatAmount(booking.balanceAmount)}</p>
                      </div>
                    </div>
  
                    {/* Payment Status */}
                    <div className="col-span-2">
                      <StatusBadge status={booking.status} />
                      <p className="text-sm mt-1">{booking.paymentMethod}</p>
                    </div>
  
                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="cursor-pointer flex items-center gap-2 text-black bg-gradient-to-r from-yellow-400 to-yellow-300 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-gold/20"
                        >
                          <FaEye />
                          View
                        </button>
                        
                        {/* Download Invoice Button - Table mein */}
                        {/* <button 
                          onClick={() => handleDownloadInvoice(booking)}
                          className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm font-medium"
                        >
                          <FaDownload />
                          Invoice
                        </button> */}
  
                        {booking.status === "pending" && (
                          <button className="cursor-pointer flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-all duration-300 text-sm font-medium">
                            <FaEdit />
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
  
                  {/* Mobile Card View */}
                  <div className="md:hidden p-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-gold to-yellow-500 rounded-lg flex items-center justify-center">
                            <FaStar className="text-white text-sm" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{booking.eventType}</h3>
                            <p className="text-gray-600 text-sm">{booking.bookingType}</p>
                          </div>
                        </div>
                        <StatusBadge status={booking.status} />
                      </div>
  
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-500">Date & Time</p>
                          <p className="text-gray-800 font-medium">
                            {formatDate(booking.eventDate)} • {booking.eventTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Venue</p>
                          <p className="text-gray-800 font-medium">{booking.venue}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Guests</p>
                          <p className="text-gray-800 font-medium">{booking.guestCount}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Amount</p>
                          <p className="text-gray-800 font-medium">{formatAmount(booking.totalAmount)}</p>
                        </div>
                      </div>
  
                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-sm font-medium"
                        >
                          <FaEye />
                          View Details
                        </button>
                        
                        {/* Download Invoice Button - Mobile mein */}
                        <button 
                          onClick={() => handleDownloadInvoice(booking)}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-300 text-sm font-medium"
                        >
                          <FaDownload />
                          Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Pagination */}
          {filteredBookings.length > entriesPerPage && <Pagination/>}
        </div>
  
        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gold/20">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Booking Details</h3>
                    <p className="text-black font-semibold">{selectedBooking.eventType}</p>
                  </div>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-white hover:bg-red-700 cursor-pointer transition-colors text-xl p-2 rounded bg-red-500"
                  >
                    ✕
                  </button>
                </div>
  
                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Event Information */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-gold/5 to-yellow-500/5 rounded-xl p-6 border border-gold/20">
                      <h4 className="text-yellow-600 font-semibold text-lg border-b border-gold/20 pb-3 mb-4 flex items-center gap-2">
                        <FaCalendarAlt className="text-yellow-600" />
                        Event Information
                      </h4>
                      <DetailItem label="Event Type" value={selectedBooking.eventType} />
                      <DetailItem label="Event Date" value={formatDate(selectedBooking.eventDate)} />
                      <DetailItem label="Event Time" value={selectedBooking.eventTime} />
                      <DetailItem label="Venue" value={selectedBooking.venue} />
                      <DetailItem label="Guest Count" value={selectedBooking.guestCount} />
                    </div>
                  </div>
  
                  {/* Booking Information */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                      <h4 className="text-blue-800 font-semibold text-lg border-b border-blue-200 pb-3 mb-4 flex items-center gap-2">
                        <FaReceipt className="text-blue-600" />
                        Booking & Payment
                      </h4>
                      <DetailItem label="Booking Type" value={selectedBooking.bookingType} />
                      <DetailItem label="Payment Method" value={selectedBooking.paymentMethod} />
                      <DetailItem label="Total Amount" value={formatAmount(selectedBooking.totalAmount)} />
                      <DetailItem label="Advance Paid" value={formatAmount(selectedBooking.advancePaid)} />
                      <DetailItem label="Balance Amount" value={formatAmount(selectedBooking.balanceAmount)} />
                    </div>
                  </div>
  
                  {/* Special Requests */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                      <h4 className="text-green-800 font-semibold text-lg border-b border-green-200 pb-3 mb-4">
                        Special Requests
                      </h4>
                      <p className="text-gray-700 bg-white rounded-lg p-4 border border-gray-200">
                        {selectedBooking.specialRequest || "No special requests"}
                      </p>
                    </div>
                  </div>
                </div>
  
                {/* Status and Actions */}
                <div className="mt-6 pt-6 border-t border-gold/20">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <StatusBadge status={selectedBooking.status} />
                    <div className="flex gap-3 flex-wrap justify-center">
                      {/* Download Invoice Button - Modal mein */}
                      <button 
                        onClick={() => handleDownloadInvoice(selectedBooking)}
                        className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium shadow-lg hover:shadow-green-500/20"
                      >
                        <FaDownload />
                        Download Invoice
                      </button>
                      
                      {selectedBooking.status === 'pending' && (
                        <button className="cursor-pointer flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 font-medium">
                          <FaTimesCircle />
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
  
        {/* Invoice Generator Modal */}
        <InvoiceGenerator 
          booking={selectedBookingForInvoice}
          isOpen={showInvoiceModal}
          onClose={handleCloseInvoiceModal}
        />
      </div>
    );
  };
  
  // Reusable detail item component
  const DetailItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-800 font-semibold text-right">{value}</span>
    </div>
  );
  
  export default MyBookings;