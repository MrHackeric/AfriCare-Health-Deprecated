import React, { useState } from 'react';

function LaborAndDeliveryModule() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What are the three stages of labor?",
      options: ["Dilation, Expulsion, Placental", "Contraction, Delivery, Recovery", "Active, Transition, Pushing", "Initial, Active, Final"],
      answer: "Dilation, Expulsion, Placental",
    },
    {
      question: "Which method can be used for pain management during labor?",
      options: ["Epidural anesthesia", "Breathing exercises", "Both of the above", "None of the above"],
      answer: "Both of the above",
    },
    {
      question: "What is the first action to take in the event of a postpartum hemorrhage?",
      options: ["Call for help", "Administer IV fluids", "Massage the uterus", "Check blood pressure"],
      answer: "Massage the uterus",
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
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Module 3: Labor and Delivery</h2>
      </header>
      <div className="p-3">

        {/* Detailed Notes */}
        <div className="mb-6">
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Detailed Notes</header>
          <div className="text-xs">
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              This module covers the stages of labor and delivery, pain management techniques, and emergency interventions.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Stages of Labor:</strong> Labor is divided into three stages: dilation, expulsion, and placental. The first stage involves the dilation of the cervix, the second stage is the expulsion of the baby, and the third stage involves the delivery of the placenta.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Pain Management:</strong> Various pain management techniques can be used during labor, including epidural anesthesia, breathing exercises, and other non-pharmacological methods. It is important to discuss pain management options with the mother and respect her choices.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Emergency Interventions:</strong> Understanding and being prepared for emergencies such as postpartum hemorrhage is crucial. Immediate actions include massaging the uterus to control bleeding and calling for help. Other interventions might involve administering IV fluids and medications as per protocol.
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
            <li>Review video demonstrations of different stages of labor and delivery techniques.</li>
            <li>Participate in role-playing scenarios to practice emergency interventions for complications like postpartum hemorrhage.</li>
            <li>Discuss pain management options and their benefits and drawbacks in group sessions.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default LaborAndDeliveryModule;
