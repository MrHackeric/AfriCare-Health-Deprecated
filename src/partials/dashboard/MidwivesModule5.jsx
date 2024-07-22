import React, { useState } from 'react';

function ComplicationsAndEmergencyCareModule() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is the most common cause of postpartum hemorrhage?",
      options: ["Uterine atony", "Retained placenta", "Genital tract trauma", "Coagulation disorders"],
      answer: "Uterine atony",
    },
    {
      question: "Which of the following is a key sign of preeclampsia?",
      options: ["Low blood pressure", "Protein in urine", "Elevated blood glucose", "Increased fetal movement"],
      answer: "Protein in urine",
    },
    {
      question: "What is the first step in managing a newborn who is not breathing at birth?",
      options: ["Administer oxygen", "Perform chest compressions", "Clear the airway", "Start IV fluids"],
      answer: "Clear the airway",
    },
  ];

  const handleQuizChange = (index, selectedOption) => {
    setQuizAnswers({ ...quizAnswers, [index]: selectedOption });
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const renderQuiz = () => {
    return questions.map((q, index) => (
      <div key={index} className="text-xs mb-4">
        <p className="text-gray-800 dark:text-gray-100 mb-2">{q.question}</p>
        {q.options.map((option, i) => (
          <div key={i} className="text-xs flex items-center mb-1">
            <input
              type="radio"
              id={`q${index}o${i}`}
              name={`question${index}`}
              value={option}
              onChange={() => handleQuizChange(index, option)}
              disabled={showResults}
              checked={quizAnswers[index] === option}
              className="text-xs"
            />
            <label htmlFor={`q${index}o${i}`} className="ml-2 text-gray-800 dark:text-gray-100">
              {option}
            </label>
          </div>
        ))}
      </div>
    ));
  };

  const renderQuizResults = () => {
    return questions.map((q, index) => (
      <div key={index} className="text-xs mb-4">
        <p className="text-gray-800 dark:text-gray-100 mb-2">{q.question}</p>
        <p className={`text-xs ${quizAnswers[index] === q.answer ? 'text-green-500' : 'text-red-500'}`}>
          Your answer: {quizAnswers[index]} {quizAnswers[index] === q.answer ? '✓' : '✗'}
        </p>
        <p className="text-gray-800 dark:text-gray-100">Correct answer: {q.answer}</p>
      </div>
    ));
  };

  return (
    <div className="flex flex-col col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Module 5: Complications and Emergency Care</h2>
      </header>
      <div className="p-3">

        {/* Detailed Notes */}
        <div className="mb-6">
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Detailed Notes</header>
          <div className="text-xs">
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              This module focuses on recognizing and managing complications that may arise during labor and delivery, as well as providing emergency care.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Postpartum Hemorrhage:</strong> The most common cause of postpartum hemorrhage is uterine atony. Immediate management includes uterine massage, administering oxytocics, and monitoring for further bleeding. If bleeding persists, additional interventions may be necessary.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Preeclampsia:</strong> A key sign of preeclampsia is protein in the urine, often accompanied by elevated blood pressure. Management may include antihypertensive medications and monitoring for signs of progression to eclampsia.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Neonatal Resuscitation:</strong> In the event a newborn is not breathing at birth, the first step is to clear the airway to ensure that the baby can breathe. Further steps may include administering oxygen and performing chest compressions if necessary.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Emergency Protocols:</strong> Familiarize yourself with emergency protocols for various complications and ensure that you can act quickly and effectively in a crisis. Regularly review and practice these protocols to maintain readiness.
            </p>
          </div>
        </div>

        {/* Interactive Quiz */}
        <div className="mb-6">
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Interactive Quiz</header>
          {renderQuiz()}
          <button
            onClick={handleSubmitQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 text-xs"
            disabled={showResults}
          >
            Submit Quiz
          </button>
          {showResults && renderQuizResults()}
        </div>

        {/* Activities */}
        <div className="mb-6">
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Activities</header>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-100 text-xs">
            <li>Participate in simulation exercises to practice managing common complications like postpartum hemorrhage and preeclampsia.</li>
            <li>Review emergency care protocols and conduct mock drills to reinforce response strategies.</li>
            <li>Analyze case studies of complicated deliveries and discuss management approaches with peers.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default ComplicationsAndEmergencyCareModule;
