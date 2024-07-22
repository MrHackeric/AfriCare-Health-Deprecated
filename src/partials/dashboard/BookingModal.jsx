import React, { useState, useEffect } from "react";

function BookingModal({ isOpen, onClose, doctor, onBook }) {
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    if (doctor) {
      setAvailableTimes(["11:00 AM", "2:00 PM", "4:00 PM"]);
    }
  }, [doctor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook(selectedTime);
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Book an Appointment with {doctor?.name}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-slate-600 dark:text-slate-400">
            Select Time Slot:
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="block w-full mb-4 p-2 border border-slate-300 rounded"
            required
          >
            <option value="">Select a time</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
            >
              Book
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
export default BookingModal;
