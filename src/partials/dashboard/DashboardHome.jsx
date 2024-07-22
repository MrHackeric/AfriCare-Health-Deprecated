import React from 'react';

function DashboardHome() {
  const modules = [
    {
      title: "Community Forum",
      description: "Connect with other healthcare professionals and community members to share knowledge, discuss cases, and seek advice.",
      icon: "👥", // Optional: Add an icon for visual representation
    },
    {
      title: "Chatbot",
      description: "Interact with our AI-powered chatbot for instant answers to your healthcare-related questions and support.",
      icon: "🤖",
    },
    {
      title: "Emergency Services",
      description: "Access vital information and resources for emergency services, including contact details and procedures.",
      icon: "🚑",
    },
    {
      title: "Midwives Training Forum",
      description: "Engage in comprehensive training modules designed for midwives, covering essential skills and knowledge for effective care.",
      icon: "👶",
    },
  ];

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5 text-xs">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Welcome to AfriCare</h2>
      <p className="text-slate-800 dark:text-slate-100 mb-4 text-xs">
        At AfriCare, we are committed to providing comprehensive healthcare resources and support. Explore our modules to enhance your knowledge and connect with our community.
      </p>
      
      {/* Module Highlights */}
      <div className="space-y-6">
        {modules.map((module, index) => (
          <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center">
              <span className="mr-2 text-xl">{module.icon}</span>
              {module.title}
            </h3>
            <p className="text-slate-800 dark:text-slate-300 text-xs">{module.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;
