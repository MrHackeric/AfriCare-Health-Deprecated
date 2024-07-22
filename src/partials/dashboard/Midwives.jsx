import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import BasicMaternalHealthCareModule from "./MidwivesModule1";
import HighRiskPregnanciesModule from "./MidwivesModule2";
import LaborAndDeliveryModule from "./MidwivesModule3";
import PostpartumCareModule from "./MidwivesModule4";
import ComplicationsAndEmergencyCareModule from "./MidwivesModule5";
import MaternalNutritionAndLifestyleModule from "./MidwivesModule6";
import PrenatalAndPostnatalMentalHealthModule from "./MidwivesModule7";
import MidwivesTrainingModule from "./MidwivesTrain";
import AdvancedMidwivesTrainingModule from "./MidwivesResources";

function Midwives() {
  const [currentModule, setCurrentModule] = useState(1);
  const [completedModules, setCompletedModules] = useState(0); // Track completed modules

  // Refs for container dimensions
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);
  const [containerHeight, setContainerHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Update container dimensions on window resize
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNext = () => {
    if (currentModule < 10) { // Change to 10 for the total number of modules
      setCompletedModules(completedModules + 1); // Increment completed modules
      setCurrentModule(currentModule + 1);
    }
  };

  const handleBack = () => {
    if (currentModule > 1) {
      setCurrentModule(currentModule - 1);
    }
  };

  const renderModule = () => {
    switch (currentModule) {
      case 1:
        return <BasicMaternalHealthCareModule />;
      case 2:
        return <HighRiskPregnanciesModule />;
      case 3:
        return <LaborAndDeliveryModule />;
      case 4:
        return <PostpartumCareModule />;
      case 5:
        return <ComplicationsAndEmergencyCareModule />;
      case 6:
        return <MaternalNutritionAndLifestyleModule />;
      case 7:
        return <PrenatalAndPostnatalMentalHealthModule />;
      case 8:
        return <MidwivesTrainingModule />;
      case 9:
        return <AdvancedMidwivesTrainingModule />;
      default:
        return <AdvancedMidwivesTrainingModule />;
    }
  };

  // Calculate progress percentage
  const progress = ((currentModule - 1) / 9) * 100; // Adjust calculation to 9

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl" ref={containerRef}>
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Midwives Training Modules</h2>
      </header>
      <div className="px-5 py-3">
        {/* Top Buttons */}
        <div className="mb-4 flex justify-between">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={handleBack}
            disabled={currentModule === 1}
          >
            Back
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleNext}
            disabled={currentModule === 10} // Update to 10 for the last module
          >
            Next
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-12 gap-6 h-full">
          <div className="col-span-full sm:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5 relative">
            {renderModule()}

            {/* Congratulations Message */}
            {completedModules === 9 && (
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center bg-white dark:bg-slate-800 z-10">
                <Confetti width={containerWidth} height={containerHeight} />
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg z-20">
                  <h1 className="text-2xl font-bold text-green-500 mb-4">Congratulations!</h1>
                  <p className="text-lg text-slate-800 dark:text-slate-100">
                    You've completed all the training modules!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-4 flex justify-between">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={handleBack}
            disabled={currentModule === 1}
          >
            Back
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleNext}
            disabled={currentModule === 10} // Update to 10 for the last module
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Midwives;
