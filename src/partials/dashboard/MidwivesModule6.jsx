import React, { useState } from 'react';

function MaternalNutritionAndLifestyleModule() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Which vitamin is crucial for fetal development during pregnancy?",
      options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin B12"],
      answer: "Vitamin D",
    },
    {
      question: "What is the recommended daily intake of folic acid for pregnant women?",
      options: ["200 mcg", "400 mcg", "800 mcg", "1200 mcg"],
      answer: "800 mcg",
    },
    {
      question: "Which of the following is a good source of iron for pregnant women?",
      options: ["Citrus fruits", "Red meat", "Whole grains", "Dairy products"],
      answer: "Red meat",
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
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Module 6: Maternal Nutrition and Lifestyle</h2>
      </header>
      <div className="p-3">

        {/* Detailed Notes */}
        <div className="mb-6">
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Detailed Notes</header>
          <div className="text-xs">
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              This module provides guidance on essential aspects of maternal nutrition and lifestyle during pregnancy to ensure the health and well-being of both mother and baby.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Nutrition:</strong> Proper nutrition is vital for the health of the pregnant woman and the development of the fetus. Key nutrients include folic acid, iron, calcium, and protein. A balanced diet with a variety of fruits, vegetables, lean proteins, and whole grains is recommended.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Folic Acid:</strong> The recommended daily intake of folic acid for pregnant women is 800 mcg. Folic acid helps prevent neural tube defects and supports fetal growth.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Iron:</strong> Iron is crucial for preventing anemia and supporting increased blood volume during pregnancy. Good sources of iron include red meat, poultry, fish, and iron-fortified cereals.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Lifestyle Choices:</strong> Pregnant women should also consider lifestyle factors such as avoiding smoking, limiting alcohol consumption, and engaging in regular physical activity, as these can significantly impact pregnancy outcomes.
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
            <li>Plan and analyze a sample meal plan for a pregnant woman, ensuring it meets nutritional requirements.</li>
            <li>Participate in discussions about common dietary concerns and how to address them with practical solutions.</li>
            <li>Review case studies on the impact of lifestyle choices on pregnancy and maternal health.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default MaternalNutritionAndLifestyleModule;
