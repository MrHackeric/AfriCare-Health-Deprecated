import React, { useState } from 'react';

function PostpartumCareModule() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is a common physical change postpartum women may experience?",
      options: ["Increased hair growth", "Swelling of the legs", "Vision improvement", "Decreased appetite"],
      answer: "Swelling of the legs",
    },
    {
      question: "What is the recommended frequency of postpartum follow-up visits?",
      options: ["Once a week", "Once a month", "Within 6 weeks", "Once every 3 months"],
      answer: "Within 6 weeks",
    },
    {
      question: "Which of the following is a common postpartum mental health concern?",
      options: ["Postpartum depression", "Seasonal affective disorder", "Chronic fatigue syndrome", "Bipolar disorder"],
      answer: "Postpartum depression",
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
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Module 4: Postpartum Care</h2>
      </header>
      <div className="p-3">

        {/* Detailed Notes */}
        <div className="mb-6">
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Detailed Notes</header>
          <div className="text-xs">
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              This module covers the essential aspects of postpartum care, including physical and emotional changes, follow-up care, and support for new mothers.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Physical Changes:</strong> Postpartum women may experience various physical changes, such as swelling of the legs, vaginal bleeding (lochia), and changes in breast size and tenderness. Monitoring these changes and providing appropriate care is crucial.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Follow-Up Care:</strong> A postpartum follow-up visit is typically recommended within 6 weeks of delivery. This visit should include an assessment of physical recovery, mental health, and breastfeeding support. Ensure that mothers are aware of the signs that require immediate medical attention.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Postpartum Mental Health:</strong> Postpartum depression is a common mental health concern affecting many new mothers. Symptoms may include persistent sadness, anxiety, and fatigue. Providing emotional support, counseling, and referrals to mental health professionals is essential for effective care.
            </p>
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              <strong>Support and Education:</strong> Educate new mothers about self-care practices, signs of complications, and when to seek help. Encourage support from family and community resources to ensure a healthy transition into parenthood.
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
            <li>Review case studies on postpartum care and discuss management strategies in group sessions.</li>
            <li>Participate in role-playing scenarios to practice providing emotional support and addressing postpartum complications.</li>
            <li>Watch video demonstrations on common postpartum physical and emotional changes and how to manage them.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default PostpartumCareModule;
