import React, { useState } from 'react';

function HighRiskPregnanciesModule() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Which of the following is a common risk factor for high-risk pregnancies?",
      options: ["Advanced maternal age", "Regular exercise", "Balanced diet", "Daily hydration"],
      answer: "Advanced maternal age",
    },
    {
      question: "What condition is characterized by high blood pressure and protein in the urine during pregnancy?",
      options: ["Gestational diabetes", "Pre-eclampsia", "Hyperemesis gravidarum", "Anemia"],
      answer: "Pre-eclampsia",
    },
    {
      question: "What is the recommended management for gestational diabetes?",
      options: ["Bed rest", "Insulin therapy and dietary management", "Increased fluid intake", "Supplemental calcium"],
      answer: "Insulin therapy and dietary management",
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
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Module 2: High-Risk Pregnancies</h2>
      </header>
      <div className="p-3">

        {/* Detailed Notes */}
        <div className="mb-6">
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Detailed Notes</header>
          <div className="text-xs">
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              This module covers the identification and management of high-risk pregnancies, including common risk factors and conditions requiring special attention.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Risk Factors:</strong> High-risk pregnancies can result from various factors such as advanced maternal age (35 or older), pre-existing medical conditions (e.g., hypertension, diabetes), multiple pregnancies (twins or more), and lifestyle factors (e.g., smoking, alcohol use).
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Pre-eclampsia:</strong> A serious condition characterized by high blood pressure and protein in the urine after 20 weeks of pregnancy. Symptoms may include severe headaches, visual disturbances, and swelling. Management includes monitoring, medication, and sometimes early delivery.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Gestational Diabetes:</strong> A type of diabetes that develops during pregnancy and affects how the body uses sugar. Management includes dietary changes, exercise, and sometimes insulin therapy. Regular monitoring of blood sugar levels is essential.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Monitoring and Management:</strong> High-risk pregnancies require closer monitoring through frequent prenatal visits, specialized tests (e.g., ultrasound, blood tests), and sometimes hospitalization. It is crucial to follow a tailored care plan to ensure the best outcomes for both mother and baby.
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
            <li>Review case studies on high-risk pregnancies and discuss management strategies in group sessions.</li>
            <li>Participate in role-playing scenarios to practice emergency interventions for conditions like pre-eclampsia.</li>
            <li>Watch video demonstrations of monitoring techniques for high-risk pregnancies.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default HighRiskPregnanciesModule;
