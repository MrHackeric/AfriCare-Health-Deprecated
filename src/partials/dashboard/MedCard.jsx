import React, { useState } from 'react';
import BookingModal from './BookingModal';

function MedicCard({ name, specialty, hospital, reviews, imageUrl, onBookAppointment }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBook = (selectedTime) => {
    console.log(`Booking appointment with ${name} at ${selectedTime}`);
    onBookAppointment(); 
  };

  return (
    <article className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5 mb-4">
      <div className="flex items-center">
        <div className="relative w-24 h-24 mr-4 flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={`${name}`} 
            className="absolute inset-0 w-full h-full object-cover rounded-full" 
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{name}</h3>
          <p className="text-slate-600 dark:text-slate-400">{specialty}</p>
          <p className="text-slate-600 dark:text-slate-400">{hospital}</p>
        </div>
      </div>
      <div className="mt-2">
        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Reviews:</h4>
        <ul className="list-disc ml-5 text-slate-600 dark:text-slate-400">
          {reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
      </div>
      <button 
        onClick={handleOpenModal} 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
      >
        Book Appointment
      </button>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        doctor={{ name, specialty }}
        onBook={handleBook} 
      />
    </article>
  );
}

export default MedicCard;
