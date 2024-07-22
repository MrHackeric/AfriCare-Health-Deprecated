import React, { useState } from 'react';

function PrenatalAndPostnatalMentalHealthModule() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is a common symptom of prenatal depression?",
      options: ["Increased energy levels", "Excessive appetite", "Persistent sadness", "Insomnia"],
      answer: "Persistent sadness",
    },
    {
      question: "Which of the following is an effective treatment for postnatal depression?",
      options: ["Increased physical activity", "Isolation from social activities", "Antidepressant medications", "Avoiding therapy sessions"],
      answer: "Antidepressant medications",
    },
    {
      question: "What is a key factor in supporting a mother with postnatal mental health issues?",
      options: ["Frequent medical check-ups", "Social support from family and friends", "Strict dietary restrictions", "Limiting physical exercise"],
      answer: "Social support from family and friends",
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
      <div key={index} className="flex flex-col mb-4">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">{q.question}</p>
        {q.options.map((option, i) => (
          <div key={i} className="flex items-center mb-1">
            <input
              type="radio"
              id={`q${index}o${i}`}
              name={`question${index}`}
              value={option}
              onChange={() => handleQuizChange(index, option)}
              disabled={showResults}
              checked={quizAnswers[index] === option}
              className="text-sm"
            />
            <label htmlFor={`q${index}o${i}`} className="ml-2 text-sm text-gray-800 dark:text-gray-100">
              {option}
            </label>
          </div>
        ))}
      </div>
    ));
  };

  const renderQuizResults = () => {
    return questions.map((q, index) => (
      <div key={index} className="flex flex-col mb-4">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">{q.question}</p>
        <p className={`text-sm ${quizAnswers[index] === q.answer ? 'text-green-500' : 'text-red-500'}`}>
          Your answer: {quizAnswers[index]} {quizAnswers[index] === q.answer ? '✓' : '✗'}
        </p>
        <p className="text-sm text-gray-800 dark:text-gray-100">Correct answer: {q.answer}</p>
      </div>
    ));
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Module 7: Prenatal and Postnatal Mental Health</h2>
      </header>
      <div className="p-5">

        {/* Detailed Notes */}
        <div className="mb-6">
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Detailed Notes</header>
          <p className="text-sm text-gray-800 dark:text-gray-100 mb-4">
            This module covers important aspects of mental health during and after pregnancy, focusing on the identification, treatment, and support for mental health issues.
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-100 mb-4">
            <strong>Prenatal Depression:</strong> Symptoms include persistent sadness, anxiety, and changes in sleep and appetite. Early identification and intervention are crucial.
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-100 mb-4">
            <strong>Postnatal Depression:</strong> This can occur after childbirth and includes symptoms such as prolonged sadness, fatigue, and difficulty bonding with the baby. Treatment may involve counseling, support groups, and antidepressant medications.
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-100 mb-4">
            <strong>Supporting Mothers:</strong> Social support from family and friends is vital. Encourage mothers to seek professional help and provide resources for mental health services.
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-100 mb-4">
            <strong>Resources:</strong> Utilize mental health resources and hotlines for immediate support. Regular follow-ups and mental health screenings can aid in early detection and management.
          </p>
        </div>

        {/* Interactive Quiz */}
        <div className="mb-6">
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Interactive Quiz</header>
          {renderQuiz()}
          <button
            onClick={handleSubmitQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            disabled={showResults}
          >
            Submit Quiz
          </button>
          {showResults && renderQuizResults()}
        </div>

        {/* Activities */}
        <div className="mb-6">
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Activities</header>
          <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-100 mb-4">
            <li>Participate in role-playing scenarios to practice identifying and supporting mothers with mental health issues.</li>
            <li>Review case studies of prenatal and postnatal depression and discuss effective intervention strategies.</li>
            <li>Develop a resource list for mental health support, including contact information for local services and hotlines.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PrenatalAndPostnatalMentalHealthModule;
