"use client";

import { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaUser,
  FaRupeeSign,
  FaEye,
  FaPrint,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaDownload,
  FaEdit,
  FaSave,
  FaTimes,
  FaBars,
  FaEllipsisV
} from "react-icons/fa";

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(6);
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedBooking, setEditedBooking] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample Data
  const sampleBookings = [
    {
      id: 1,
      userId: "user001",
      userName: "Aarav Sharma",
      userEmail: "aarav.sharma@email.com",
      userPhone: "+91 9876543210",
      eventType: "Wedding Reception",
      eventTime: "07:00 PM",
      eventDate: "2024-03-15",
      bookingType: "Royal Package",
      guestCount: 250,
      totalAmount: 325000,
      specialRequest: "Rose petal decoration, live shehnai, vegetarian royal cuisine",
      paymentMethod: "Credit Card",
      status: "pending",
      bookingDate: "2024-01-10 14:30:00",
      venue: "Crystal Ballroom",
      advancePaid: 150000,
      balanceAmount: 175000,
      address: "123 Grand Street, Mumbai"
    },
    {
      id: 2,
      userId: "user001", 
      userName: "Aarav Sharma",
      userEmail: "aarav.sharma@email.com",
      userPhone: "+91 9876543210",
      eventType: "Engagement Ceremony",
      eventTime: "06:30 PM",
      eventDate: "2024-04-20",
      bookingType: "Elite Package",
      guestCount: 150,
      totalAmount: 185000,
      specialRequest: "Jain food, floral mandap",
      paymentMethod: "UPI",
      status: "pending",
      bookingDate: "2024-01-12 11:20:00",
      venue: "Garden Pavilion",
      advancePaid: 75000,
      balanceAmount: 110000,
      address: "123 Grand Street, Mumbai"
    },
    {
      id: 3,
      userId: "user002",
      userName: "Priya Patel",
      userEmail: "priya.patel@email.com",
      userPhone: "+91 9876543211",
      eventType: "Birthday Party",
      eventTime: "08:00 PM",
      eventDate: "2024-03-25",
      bookingType: "Premium Package",
      guestCount: 100,
      totalAmount: 125000,
      specialRequest: "DJ night, chocolate fountain",
      paymentMethod: "Debit Card",
      status: "accepted",
      bookingDate: "2024-01-08 16:45:00",
      venue: "Poolside Venue",
      advancePaid: 60000,
      balanceAmount: 65000,
      address: "456 Royal Avenue, Delhi"
    },
    {
      id: 4,
      userId: "user002",
      userName: "Priya Patel",
      userEmail: "priya.patel@email.com",
      userPhone: "+91 9876543211",
      eventType: "Birthday Party",
      eventTime: "08:00 PM",
      eventDate: "2024-03-25",
      bookingType: "Premium Package",
      guestCount: 100,
      totalAmount: 125000,
      specialRequest: "DJ night, chocolate fountain",
      paymentMethod: "Debit Card",
      status: "accepted",
      bookingDate: "2024-01-08 16:45:00",
      venue: "Poolside Venue",
      advancePaid: 60000,
      balanceAmount: 65000,
      address: "456 Royal Avenue, Delhi"
    },
    {
      id: 5,
      userId: "user002",
      userName: "Priya Patel",
      userEmail: "priya.patel@email.com",
      userPhone: "+91 9876543211",
      eventType: "Birthday Party",
      eventTime: "08:00 PM",
      eventDate: "2024-03-25",
      bookingType: "Premium Package",
      guestCount: 100,
      totalAmount: 125000,
      specialRequest: "DJ night, chocolate fountain",
      paymentMethod: "Debit Card",
      status: "accepted",
      bookingDate: "2024-01-08 16:45:00",
      venue: "Poolside Venue",
      advancePaid: 60000,
      balanceAmount: 65000,
      address: "456 Royal Avenue, Delhi"
    },
    {
      id: 6,
      userId: "user002",
      userName: "Priya Patel",
      userEmail: "priya.patel@email.com",
      userPhone: "+91 9876543211",
      eventType: "Birthday Party",
      eventTime: "08:00 PM",
      eventDate: "2024-03-25",
      bookingType: "Premium Package",
      guestCount: 100,
      totalAmount: 125000,
      specialRequest: "DJ night, chocolate fountain",
      paymentMethod: "Debit Card",
      status: "accepted",
      bookingDate: "2024-01-08 16:45:00",
      venue: "Poolside Venue",
      advancePaid: 60000,
      balanceAmount: 65000,
      address: "456 Royal Avenue, Delhi"
    },
    {
      id: 7,
      userId: "user002",
      userName: "Priya Patel",
      userEmail: "priya.patel@email.com",
      userPhone: "+91 9876543211",
      eventType: "Birthday Party",
      eventTime: "08:00 PM",
      eventDate: "2024-03-25",
      bookingType: "Premium Package",
      guestCount: 100,
      totalAmount: 125000,
      specialRequest: "DJ night, chocolate fountain",
      paymentMethod: "Debit Card",
      status: "pending",
      bookingDate: "2024-01-08 16:45:00",
      venue: "Poolside Venue",
      advancePaid: 60000,
      balanceAmount: 65000,
      address: "456 Royal Avenue, Delhi"
    },
    {
      id: 8,
      userId: "user002",
      userName: "Priya Patel",
      userEmail: "priya.patel@email.com",
      userPhone: "+91 9876543211",
      eventType: "Birthday Party",
      eventTime: "08:00 PM",
      eventDate: "2024-03-25",
      bookingType: "Premium Package",
      guestCount: 100,
      totalAmount: 125000,
      specialRequest: "DJ night, chocolate fountain",
      paymentMethod: "Debit Card",
      status: "pending",
      bookingDate: "2024-01-08 16:45:00",
      venue: "Poolside Venue",
      advancePaid: 60000,
      balanceAmount: 65000,
      address: "456 Royal Avenue, Delhi"
    },
    {
      id: 9,
      userId: "user002",
      userName: "Priya Patel",
      userEmail: "priya.patel@email.com",
      userPhone: "+91 9876543211",
      eventType: "Birthday Party",
      eventTime: "08:00 PM",
      eventDate: "2024-03-25",
      bookingType: "Premium Package",
      guestCount: 100,
      totalAmount: 125000,
      specialRequest: "DJ night, chocolate fountain",
      paymentMethod: "Debit Card",
      status: "accepted",
      bookingDate: "2024-01-08 16:45:00",
      venue: "Poolside Venue",
      advancePaid: 60000,
      balanceAmount: 65000,
      address: "456 Royal Avenue, Delhi"
    },
    {
      id: 10,
      userId: "user002",
      userName: "Priya Patel",
      userEmail: "priya.patel@email.com",
      userPhone: "+91 9876543211",
      eventType: "Birthday Party",
      eventTime: "08:00 PM",
      eventDate: "2024-03-25",
      bookingType: "Premium Package",
      guestCount: 100,
      totalAmount: 125000,
      specialRequest: "DJ night, chocolate fountain",
      paymentMethod: "Debit Card",
      status: "pending",
      bookingDate: "2024-01-08 16:45:00",
      venue: "Poolside Venue",
      advancePaid: 60000,
      balanceAmount: 65000,
      address: "456 Royal Avenue, Delhi"
    }
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setBookingsData(sampleBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Filter bookings
  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch =
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.venue.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesDate = !dateFilter || booking.eventDate === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredBookings.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredBookings.length / entriesPerPage);

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { 
        bg: "bg-yellow-100", 
        text: "text-yellow-800", 
        border: "border-yellow-200",
        icon: FaClock, 
        label: "Pending" 
      },
      accepted: { 
        bg: "bg-green-100", 
        text: "text-green-800", 
        border: "border-green-200",
        icon: FaCheckCircle, 
        label: "Accepted" 
      },
      rejected: { 
        bg: "bg-red-100", 
        text: "text-red-800", 
        border: "border-red-200",
        icon: FaTimesCircle, 
        label: "Rejected" 
      }
    };
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`${config.bg} ${config.text} ${config.border} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 border`}>
        <Icon className="text-xs" />
        <span className="hidden sm:inline">{config.label}</span>
      </span>
    );
  };

  // Accept/Reject Functions
  const handleAccept = (bookingId) => {
    setBookingsData(prev => 
      prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: "accepted" } : booking
      )
    );
  };

  const handleReject = (bookingId) => {
    setBookingsData(prev => 
      prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: "rejected" } : booking
      )
    );
  };

  // Edit Functions
  const handleEdit = (booking) => {
    setEditMode(true);
    setEditedBooking({ ...booking });
    setSelectedBooking(booking);
  };

  const handleSaveEdit = () => {
    if (editedBooking) {
      setBookingsData(prev => 
        prev.map(booking => 
          booking.id === editedBooking.id ? editedBooking : booking
        )
      );
      setEditMode(false);
      setEditedBooking(null);
      setSelectedBooking(null);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedBooking(null);
    setSelectedBooking(null);
  };

  const handleInputChange = (field, value) => {
    setEditedBooking(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Print Functions
  const printSingleBooking = (booking) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Booking Invoice - ${booking.userName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Grand Venue - Booking Invoice</h1>
            <p>Booking ID: ${booking.id} | Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="section">
            <div class="section-title">Customer Details</div>
            <div class="detail-row"><span>Name:</span><span>${booking.userName}</span></div>
            <div class="detail-row"><span>Email:</span><span>${booking.userEmail}</span></div>
            <div class="detail-row"><span>Phone:</span><span>${booking.userPhone}</span></div>
          </div>
          <div class="section">
            <div class="section-title">Event Details</div>
            <div class="detail-row"><span>Event Type:</span><span>${booking.eventType}</span></div>
            <div class="detail-row"><span>Date:</span><span>${new Date(booking.eventDate).toLocaleDateString()}</span></div>
            <div class="detail-row"><span>Time:</span><span>${booking.eventTime}</span></div>
            <div class="detail-row"><span>Venue:</span><span>${booking.venue}</span></div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const printAllBookings = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>All Bookings Report - ${new Date().toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f8f8f8; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Grand Venue - Complete Bookings Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()} | Total Bookings: ${bookingsData.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Event Type</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${bookingsData.map(booking => `
                <tr>
                  <td>${booking.id}</td>
                  <td>${booking.userName}</td>
                  <td>${booking.eventType}</td>
                  <td>${new Date(booking.eventDate).toLocaleDateString()}</td>
                  <td>${booking.venue}</td>
                  <td>₹${booking.totalAmount?.toLocaleString('en-IN')}</td>
                  <td>${booking.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Format functions
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-IN");
  const formatAmount = (amount) => `₹${amount?.toLocaleString("en-IN")}`;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading bookings...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg bg-white border border-gray-300"
            >
              <FaBars className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Bookings Management</h1>
              <p className="text-gray-600 text-sm sm:text-base">Manage all customer bookings</p>
            </div>
          </div>
          <button
            onClick={printAllBookings}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <FaDownload className="text-xs sm:text-sm" />
            <span>Print All</span>
          </button>
        </div>

        {/* Stats Cards - Mobile Friendly */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border text-center">
            <p className="text-lg sm:text-2xl font-bold text-gray-900">{filteredBookings.length}</p>
            <p className="text-gray-600 text-xs sm:text-sm">Total Bookings</p>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border text-center">
            <p className="text-lg sm:text-2xl font-bold text-yellow-600">
              {filteredBookings.filter(b => b.status === 'pending').length}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm">Pending</p>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border text-center">
            <p className="text-lg sm:text-2xl font-bold text-green-600">
              {filteredBookings.filter(b => b.status === 'accepted').length}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm">Accepted</p>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border text-center">
            <p className="text-lg sm:text-2xl font-bold text-red-600">
              {filteredBookings.filter(b => b.status === 'rejected').length}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm">Rejected</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="text-gray-900 w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full text-gray-900 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
            >      
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="w-full text-gray-900 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>

        {/* Bookings List - Mobile Cards / Desktop Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden sm:block bg-gray-50 border-b">
            <div className="grid grid-cols-12 gap-4 p-4 text-sm font-semibold text-gray-700">
              <div className="col-span-3">Customer & Event</div>
              <div className="col-span-2">Date & Venue</div>
              <div className="col-span-2">Package & Amount</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3 text-center">Actions</div>
            </div>
          </div>

          {/* Mobile & Desktop Content */}
          <div className="divide-y divide-gray-100">
            {currentEntries.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <FaCalendarAlt className="text-gray-400 text-2xl sm:text-4xl mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-600 text-base sm:text-lg mb-2">No bookings found</p>
                <p className="text-gray-500 text-sm sm:text-base">Try changing your search criteria</p>
              </div>
            ) : currentEntries.map(booking => (
              <div key={booking.id} className="hover:bg-gray-50 transition-colors">
                {/* Desktop View */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-4 p-4 items-center">
                  
                  {/* Customer & Event */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{booking.userName}</h3>
                        <p className="text-xs text-gray-600">{booking.eventType}</p>
                        <p className="text-xs text-gray-500">{booking.bookingType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Date & Venue */}
                  <div className="col-span-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-yellow-500 text-xs" />
                        <span className="text-sm text-gray-800">{formatDate(booking.eventDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-yellow-500 text-xs" />
                        <span className="text-sm text-gray-800">{booking.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Package & Amount */}
                  <div className="col-span-2">
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900 text-sm">{booking.bookingType}</p>
                      <div className="flex items-center gap-1">
                        <FaRupeeSign className="text-yellow-500 text-sm" />
                        <span className="text-gray-900 text-sm">{formatAmount(booking.totalAmount)}</span>
                      </div>
                      <p className="text-xs text-gray-500">{booking.guestCount} guests</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <StatusBadge status={booking.status} />
                  </div>

                  {/* Actions */}
                  <div className="col-span-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                        >
                          <FaEye className="text-xs" />
                          View
                        </button>
                        <button
                          onClick={() => printSingleBooking(booking)}
                          className="flex-1 flex items-center justify-center gap-1 bg-purple-600 text-white px-2 py-1 rounded text-xs hover:bg-purple-700 transition-colors"
                        >
                          <FaPrint className="text-xs" />
                          Print
                        </button>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(booking)}
                          className="flex-1 flex items-center justify-center gap-1 bg-yellow-600 text-white px-2 py-1 rounded text-xs hover:bg-yellow-700 transition-colors"
                        >
                          <FaEdit className="text-xs" />
                          Edit
                        </button>
                        
                        {booking.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleAccept(booking.id)}
                              className="flex-1 flex items-center justify-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                            >
                              <FaCheckCircle className="text-xs" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(booking.id)}
                              className="flex-1 flex items-center justify-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                            >
                              <FaTimesCircle className="text-xs" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="sm:hidden p-3">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                          <FaUser className="text-white text-xs" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{booking.userName}</h3>
                          <p className="text-xs text-gray-500">{booking.eventType}</p>
                        </div>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                      <div>
                        <p className="text-gray-800">Date</p>
                        <p className="font-semibold text-gray-800">{formatDate(booking.eventDate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-800">Time</p>
                        <p className="font-semibold text-gray-800">{booking.eventTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-800">Venue</p>
                        <p className="font-semibold text-gray-800">{booking.venue}</p>
                      </div>
                      <div>
                        <p className="text-gray-800">Guests</p>
                        <p className="font-semibold text-gray-800">{booking.guestCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-800">Package</p>
                        <p className="font-semibold text-gray-800">{booking.bookingType}</p>
                      </div>
                      <div>
                        <p className="text-gray-800">Amount</p>
                        <p className="font-semibold text-gray-800">{formatAmount(booking.totalAmount)}</p>
                      </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex flex-col gap-2">
                      {/* Primary Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white px-2 py-2 rounded text-xs hover:bg-blue-700 transition-colors"
                        >
                          <FaEye className="text-xs" />
                          View Details
                        </button>
                        <button
                          onClick={() => printSingleBooking(booking)}
                          className="flex-1 flex items-center justify-center gap-1 bg-purple-600 text-white px-2 py-2 rounded text-xs hover:bg-purple-700 transition-colors"
                        >
                          <FaPrint className="text-xs" />
                          Print
                        </button>
                      </div>

                      {/* Secondary Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(booking)}
                          className="flex-1 flex items-center justify-center gap-1 bg-yellow-600 text-white px-2 py-2 rounded text-xs hover:bg-yellow-700 transition-colors"
                        >
                          <FaEdit className="text-xs" />
                          Edit
                        </button>
                        
                        {booking.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleAccept(booking.id)}
                              className="flex-1 flex items-center justify-center gap-1 bg-green-600 text-white px-2 py-2 rounded text-xs hover:bg-green-700 transition-colors"
                            >
                              <FaCheckCircle className="text-xs" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(booking.id)}
                              className="flex-1 flex items-center justify-center gap-1 bg-red-600 text-white px-2 py-2 rounded text-xs hover:bg-red-700 transition-colors"
                            >
                              <FaTimesCircle className="text-xs" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {filteredBookings.length > entriesPerPage && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 sm:mt-6">
            <p className="text-gray-600 text-xs sm:text-sm">
              Showing {indexOfFirstEntry + 1}-{Math.min(indexOfLastEntry, filteredBookings.length)} of {filteredBookings.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal - Responsive */}
      {selectedBooking && !editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Booking Details</h2>
                  <p className="text-gray-600 text-sm">Booking ID: {selectedBooking.id}</p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Customer Information */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                    <FaUser className="text-yellow-500 text-sm sm:text-base" />
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                    <DetailItem label="Name" value={selectedBooking.userName} />
                    <DetailItem label="Email" value={selectedBooking.userEmail} />
                    <DetailItem label="Phone" value={selectedBooking.userPhone} />
                    <DetailItem label="Address" value={selectedBooking.address} />
                  </div>
                </div>

                {/* Event Information */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-500 text-sm sm:text-base" />
                    Event Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                    <DetailItem label="Event Type" value={selectedBooking.eventType} />
                    <DetailItem label="Date" value={formatDate(selectedBooking.eventDate)} />
                    <DetailItem label="Time" value={selectedBooking.eventTime} />
                    <DetailItem label="Venue" value={selectedBooking.venue} />
                    <DetailItem label="Guests" value={selectedBooking.guestCount} />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                    <FaRupeeSign className="text-yellow-500 text-sm sm:text-base" />
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                    <DetailItem label="Package" value={selectedBooking.bookingType} />
                    <DetailItem label="Payment Method" value={selectedBooking.paymentMethod} />
                    <DetailItem label="Total Amount" value={formatAmount(selectedBooking.totalAmount)} />
                    <DetailItem label="Advance Paid" value={formatAmount(selectedBooking.advancePaid)} />
                    <DetailItem label="Balance Due" value={formatAmount(selectedBooking.balanceAmount)} />
                    <DetailItem label="Status" value={<StatusBadge status={selectedBooking.status} />} />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Special Requests</h3>
                  <p className="text-gray-700 text-sm">{selectedBooking.specialRequest}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 justify-end mt-4 sm:mt-6 pt-3 sm:pt-4 border-t">
                <button
                  onClick={() => handleEdit(selectedBooking)}
                  className="flex items-center gap-1 sm:gap-2 bg-yellow-600 text-white px-3 py-2 text-xs sm:text-sm rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <FaEdit className="text-xs" />
                  Edit
                </button>
                {selectedBooking.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(selectedBooking.id)}
                      className="flex items-center gap-1 sm:gap-2 bg-green-600 text-white px-3 py-2 text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaCheckCircle className="text-xs" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(selectedBooking.id)}
                      className="flex items-center gap-1 sm:gap-2 bg-red-600 text-white px-3 py-2 text-xs sm:text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <FaTimesCircle className="text-xs" />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => printSingleBooking(selectedBooking)}
                  className="flex items-center gap-1 sm:gap-2 bg-purple-600 text-white px-3 py-2 text-xs sm:text-sm rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FaPrint className="text-xs" />
                  Print
                </button>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="flex items-center gap-1 sm:gap-2 bg-gray-600 text-white px-3 py-2 text-xs sm:text-sm rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FaTimes className="text-xs" />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Booking Modal - Responsive */}
      {editMode && editedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Booking</h2>
                  <p className="text-gray-600 text-sm">Booking ID: {editedBooking.id}</p>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Customer Information */}
                <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-200">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Customer Information</h3>
                  <div className="space-y-3">
                    <EditField label="Name" value={editedBooking.userName} onChange={(value) => handleInputChange('userName', value)} />
                    <EditField label="Email" value={editedBooking.userEmail} onChange={(value) => handleInputChange('userEmail', value)} />
                    <EditField label="Phone" value={editedBooking.userPhone} onChange={(value) => handleInputChange('userPhone', value)} />
                    <EditField label="Address" value={editedBooking.address} onChange={(value) => handleInputChange('address', value)} textarea />
                  </div>
                </div>

                {/* Event Information */}
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Event Information</h3>
                  <div className="space-y-3">
                    <EditField label="Event Type" value={editedBooking.eventType} onChange={(value) => handleInputChange('eventType', value)} />
                    <EditField label="Event Date" value={editedBooking.eventDate} onChange={(value) => handleInputChange('eventDate', value)} type="date" />
                    <EditField label="Event Time" value={editedBooking.eventTime} onChange={(value) => handleInputChange('eventTime', value)} />
                    <EditField label="Venue" value={editedBooking.venue} onChange={(value) => handleInputChange('venue', value)} />
                    <EditField label="Guest Count" value={editedBooking.guestCount} onChange={(value) => handleInputChange('guestCount', value)} type="number" />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Payment Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <EditField label="Package Type" value={editedBooking.bookingType} onChange={(value) => handleInputChange('bookingType', value)} />
                    <EditField label="Payment Method" value={editedBooking.paymentMethod} onChange={(value) => handleInputChange('paymentMethod', value)} />
                    <EditField label="Total Amount" value={editedBooking.totalAmount} onChange={(value) => handleInputChange('totalAmount', value)} type="number" />
                    <EditField label="Advance Paid" value={editedBooking.advancePaid} onChange={(value) => handleInputChange('advancePaid', value)} type="number" />
                    <EditField label="Balance Amount" value={editedBooking.balanceAmount} onChange={(value) => handleInputChange('balanceAmount', value)} type="number" />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={editedBooking.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full p-2 sm:p-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-200">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Special Requests</h3>
                  <EditField value={editedBooking.specialRequest} onChange={(value) => handleInputChange('specialRequest', value)} textarea />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 justify-end mt-4 sm:mt-6 pt-3 sm:pt-4 border-t">
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-1 sm:gap-2 bg-gray-600 text-white px-3 py-2 text-xs sm:text-sm rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FaTimes className="text-xs" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-1 sm:gap-2 bg-green-600 text-white px-3 py-2 text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaSave className="text-xs" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-600 font-medium text-xs sm:text-sm">{label}</span>
    <span className="text-gray-900 font-semibold text-right text-xs sm:text-sm">{value}</span>
  </div>
);

const EditField = ({ label, value, onChange, type = "text", textarea = false }) => (
  <div>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1 text-xs sm:text-sm">{label}</label>}
    {textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows="3"
        className="w-full p-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
      />
    )}
  </div>
);

export default AdminBookings;