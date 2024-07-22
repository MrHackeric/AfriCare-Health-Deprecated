import React from 'react';

function BenefitsModule() {
  const benefits = [
    {
      title: "Comprehensive Resources",
      description: "Access a wide range of healthcare resources, from educational materials to practical tools designed to support your professional development and patient care.",
      icon: "📚",
    },
    {
      title: "Expert Support",
      description: "Receive guidance and support from healthcare experts and professionals who are dedicated to helping you navigate challenges and improve outcomes.",
      icon: "💬",
    },
    {
      title: "Community Engagement",
      description: "Join a vibrant community of like-minded professionals and engage in discussions, share experiences, and collaborate on solutions.",
      icon: "🌐",
    },
    {
      title: "Up-to-Date Information",
      description: "Stay informed with the latest updates and best practices in healthcare, ensuring you provide the most current and effective care.",
      icon: "📰",
    },
  ];

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5 text-xs">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Benefits of AfriCare</h2>
      <p className="text-slate-800 dark:text-slate-100 mb-4 text-xs">
        Discover the many advantages of being part of the AfriCare network. We offer a range of benefits designed to support and enhance your healthcare practice.
      </p>
      
      {/* Benefits Highlights */}
      <div className="space-y-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center">
              <span className="mr-2 text-xl">{benefit.icon}</span>
              {benefit.title}
            </h3>
            <p className="text-slate-800 dark:text-slate-300 text-xs">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BenefitsModule;
