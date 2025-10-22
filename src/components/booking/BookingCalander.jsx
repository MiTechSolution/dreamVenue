'use client';
import React, { useState } from 'react';
import { format } from 'date-fns';

const bookedDates = ['2025-10-25', '2025-10-27']; // Example booked dates

const BookingCalendar = ({ show, onClose, onSelectDates }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  if (!show) return null;

  const handleDateClick = (date) => {
    const formatted = format(date, 'yyyy-MM-dd');

    if (bookedDates.includes(formatted)) return; // can't select booked ones

    setSelectedDates((prev) =>
      prev.includes(formatted)
        ? prev.filter((d) => d !== formatted)
        : [...prev, formatted]
    );
  };

  const handleDone = () => {
    onSelectDates(selectedDates);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl w-[400px] shadow-xl border border-yellow-400">
        <h2 className="text-xl font-bold mb-4 text-yellow-400 text-center">Select Event Dates</h2>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: 30 }).map((_, i) => {
            const date = new Date(2025, 9, i + 1);
            const formatted = format(date, 'yyyy-MM-dd');
            const isBooked = bookedDates.includes(formatted);
            const isSelected = selectedDates.includes(formatted);

            return (
              <button
                key={i}
                onClick={() => handleDateClick(date)}
                disabled={isBooked}
                className={`p-2 rounded-lg text-sm ${
                  isBooked
                    ? 'bg-red-600 text-gray-300 cursor-not-allowed'
                    : isSelected
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 inline-block rounded"></span> Available</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-600 inline-block rounded"></span> Booked</span>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Cancel</button>
          <button onClick={handleDone} className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300">Done</button>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
