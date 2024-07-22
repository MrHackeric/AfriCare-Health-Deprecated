import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import MedicCard from "../partials/dashboard/MedCard";

function Emergencies() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const medics = [
    {
      name: "Dr. Jane Wambui",
      specialty: "Gynecologist",
      hospital: "General Hospital",
      reviews: ["Great doctor!", "Very professional and caring."],
      imageUrl:
        "https://media.istockphoto.com/id/1149511236/photo/you-wont-need-a-second-opinion-with-her-expertise.webp?b=1&s=170667a&w=0&k=20&c=89JZgpQhYhd1vuYMR-60rXsp35vjyX1gWeWPN88eEN4=",
    },
    {
      name: "Dr. Elvis Karanja",
      specialty: "Therapist",
      hospital: "City Health Center",
      reviews: ["Helped me a lot with my issues.", "Highly recommend!"],
      imageUrl:
        "https://media.istockphoto.com/id/1390000431/photo/shot-of-a-mature-doctor-using-a-digital-tablet-in-a-modern-hospital.webp?b=1&s=170667a&w=0&k=20&c=Jxhk_KZSo9oSZ01Nv8TxjCKKEVZQJFVWICZb64AEIMQ=",
    },
    // Add more medics as needed
  ];

  const handleBookAppointment = (name) => {
    console.log(`Booking an appointment with ${name}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="pt-2">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <header className="sm:flex sm:justify-between sm:items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Emergency Assistance
              </h1>
            </header>

            <section className="grid grid-cols-12 gap-6">
              <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                <div className="p-3">
                  {medics.map((medic, index) => (
                    <div key={index} className="mb-4">
                      <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
                        {medic.specialty}
                      </header>
                      <div className="flex px-2 py-2 border-b border-gray-100 dark:border-gray-700/60">
                        <img
                          className="w-16 h-16 rounded-full mr-3"
                          src={medic.imageUrl}
                          alt={`${medic.name}`}
                        />
                        <div className="flex-1">
                          <h2 className="font-medium text-gray-800 dark:text-gray-100">
                            {medic.name}
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {medic.hospital}
                          </p>
                          <button
                            className="mt-2 text-sm text-blue-600 dark:text-blue-400"
                            onClick={() => handleBookAppointment(medic.name)}
                          >
                            Book Appointment
                          </button>
                        </div>
                      </div>
                      <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {medic.reviews.map((review, i) => (
                          <li key={i}>{review}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Emergencies;


// import React, { useState } from "react";
// import Sidebar from "../partials/Sidebar";
// import Header from "../partials/Header";
// import MedicCard from "../partials/dashboard/MedCard";

// function Emergencies() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const medics = [
//     {
//       name: "Dr. Jane Wambui",
//       specialty: "Gynecologist",
//       hospital: "General Hospital",
//       reviews: ["Great doctor!", "Very professional and caring."],
//       imageUrl:
//         "https://media.istockphoto.com/id/1149511236/photo/you-wont-need-a-second-opinion-with-her-expertise.webp?b=1&s=170667a&w=0&k=20&c=89JZgpQhYhd1vuYMR-60rXsp35vjyX1gWeWPN88eEN4=",
//     },
//     {
//       name: "Dr. Elvis Karanja",
//       specialty: "Therapist",
//       hospital: "City Health Center",
//       reviews: ["Helped me a lot with my issues.", "Highly recommend!"],
//       imageUrl:
//         "https://media.istockphoto.com/id/1390000431/photo/shot-of-a-mature-doctor-using-a-digital-tablet-in-a-modern-hospital.webp?b=1&s=170667a&w=0&k=20&c=Jxhk_KZSo9oSZ01Nv8TxjCKKEVZQJFVWICZb64AEIMQ=",
//     },
//     // Add more medics as needed
//   ];

//   const handleBookAppointment = (name) => {
//     console.log(`Booking an appointment with ${name}`);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main className="pt-2">
//           <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//             <header className="sm:flex sm:justify-between sm:items-center mb-8">
//               <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
//                 Emergency Assistance
//               </h1>
//             </header>

//             <section className="grid grid-cols-12 gap-6">
//               <div className="col-span-full">
//                 {medics.map((medic, index) => (
//                   <MedicCard
//                     key={index}
//                     name={medic.name}
//                     specialty={medic.specialty}
//                     hospital={medic.hospital}
//                     reviews={medic.reviews}
//                     imageUrl={medic.imageUrl}
//                     onBookAppointment={() => handleBookAppointment(medic.name)}
//                   />
//                 ))}
//               </div>
//             </section>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Emergencies;
