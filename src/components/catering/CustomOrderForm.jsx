// components/catering/CustomOrderForm.js
"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  FaUser, 
  FaPhone, 
  FaCalendar, 
  FaUsers, 
  FaUtensils,
  FaMapMarkerAlt 
} from "react-icons/fa";

const CustomOrderForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const menuItems = [
    { id: 1, name: "Chicken Biryani", category: "main", price: 400 },
    { id: 2, name: "Mutton Korma", category: "main", price: 600 },
    { id: 3, name: "Paneer Butter Masala", category: "main", price: 350 },
    { id: 4, name: "Veg Biryani", category: "main", price: 300 },
    { id: 5, name: "Chicken Tikka", category: "appetizer", price: 250 },
    { id: 6, name: "Spring Rolls", category: "appetizer", price: 200 },
    { id: 7, name: "Gulab Jamun", category: "dessert", price: 150 },
    { id: 8, name: "Ice Cream", category: "dessert", price: 100 },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    eventDate: Yup.date().required("Event date is required"),
    guestCount: Yup.number().min(10, "Minimum 10 guests").required("Guest count is required"),
    address: Yup.string().required("Delivery address is required"),
    specialInstructions: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      eventDate: "",
      guestCount: "",
      address: "",
      specialInstructions: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const orderData = {
        ...values,
        selectedItems,
        totalAmount: selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
      console.log("Order Data:", orderData);
      // Handle order submission here
    },
  });

  const addItem = (item) => {
    setSelectedItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (itemId) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeItem(itemId);
      return;
    }
    setSelectedItems(prev =>
      prev.map(item => item.id === itemId ? { ...item, quantity } : item)
    );
  };

  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="py-16 bg-gray-900 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4 font-cinzel">
          Custom Catering Order
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Build your perfect menu or order individual items
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Menu Selection */}
          <div className="bg-black rounded-2xl p-6 border border-gold/30">
            <h3 className="text-2xl font-bold text-white mb-6">Menu Items</h3>
            
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <p className="text-gold">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => addItem(item)}
                    className="gold-button px-4 py-2 rounded-lg hover:scale-105 transition-transform"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Form */}
          <div className="space-y-6">
            {/* Selected Items */}
            <div className="bg-black rounded-2xl p-6 border border-gold/30">
              <h3 className="text-2xl font-bold text-white mb-4">Your Order</h3>
              
              {selectedItems.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No items selected</p>
              ) : (
                <div className="space-y-3">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="text-white">{item.name}</h4>
                        <p className="text-gold">₹{item.price} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-red-600 text-white w-6 h-6 rounded-full"
                        >
                          -
                        </button>
                        <span className="text-white mx-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-green-600 text-white w-6 h-6 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-gold/30 pt-3">
                    <div className="flex justify-between text-lg font-bold text-white">
                      <span>Total:</span>
                      <span className="text-gold">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Form */}
            <form onSubmit={formik.handleSubmit} className="bg-black rounded-2xl p-6 border border-gold/30">
              <div className="space-y-4">
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    name="name"
                    placeholder="Full Name"
                    {...formik.getFieldProps('name')}
                    className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    {...formik.getFieldProps('phone')}
                    className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="eventDate"
                    {...formik.getFieldProps('eventDate')}
                    className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="guestCount"
                    placeholder="Number of Guests"
                    {...formik.getFieldProps('guestCount')}
                    className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <textarea
                    name="address"
                    placeholder="Delivery Address"
                    {...formik.getFieldProps('address')}
                    rows="3"
                    className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:border-gold focus:outline-none"
                  />
                </div>

                <textarea
                  name="specialInstructions"
                  placeholder="Special Instructions (Allergies, Preferences, etc.)"
                  {...formik.getFieldProps('specialInstructions')}
                  rows="3"
                  className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:border-gold focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={selectedItems.length === 0}
                  className="w-full gold-button py-3 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  Place Order - ₹{totalAmount}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderForm;