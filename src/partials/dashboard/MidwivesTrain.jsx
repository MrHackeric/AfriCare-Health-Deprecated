import React, { useState } from 'react';

function MidwivesTrainingModule() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What is the recommended duration for exclusive breastfeeding?",
      options: ["3 months", "6 months", "9 months", "12 months"],
      correctAnswer: "6 months",
    },
    {
      id: 2,
      question: "Which of the following is a sign of pre-eclampsia?",
      options: ["High blood pressure", "Low blood sugar", "Frequent urination", "Headache"],
      correctAnswer: "High blood pressure",
    },
    {
      id: 3,
      question: "How often should prenatal visits be scheduled after 28 weeks of pregnancy?",
      options: ["Every week", "Every 2 weeks", "Every 3 weeks", "Every month"],
      correctAnswer: "Every 2 weeks",
    },
    {
      id: 4,
      question: "What is the most critical period for fetal development?",
      options: ["First trimester", "Second trimester", "Third trimester", "Postnatal period"],
      correctAnswer: "First trimester",
    },
    {
      id: 5,
      question: "Which nutrient is essential to prevent neural tube defects?",
      options: ["Vitamin C", "Iron", "Calcium", "Folic acid"],
      correctAnswer: "Folic acid",
    },
    {
      id: 6,
      question: "What is the normal range for fetal heart rate?",
      options: ["60-100 bpm", "110-160 bpm", "170-200 bpm", "200-240 bpm"],
      correctAnswer: "110-160 bpm",
    },
    {
      id: 7,
      question: "Which practice can help prevent postpartum hemorrhage?",
      options: ["Early cord clamping", "Delayed cord clamping", "Uterine massage", "High fluid intake"],
      correctAnswer: "Uterine massage",
    },
    {
      id: 8,
      question: "When should a pregnant woman receive the tetanus vaccine?",
      options: ["First trimester", "Second trimester", "Third trimester", "Postnatal period"],
      correctAnswer: "Second trimester",
    },
    {
      id: 9,
      question: "What is a common symptom of gestational diabetes?",
      options: ["Fatigue", "Frequent infections", "Increased thirst", "Hair loss"],
      correctAnswer: "Increased thirst",
    },
    {
      id: 10,
      question: "Which position is generally recommended for sleeping during pregnancy?",
      options: ["On the back", "On the stomach", "On the left side", "On the right side"],
      correctAnswer: "On the left side",
    },
    {
      id: 11,
      question: "What is the purpose of a Group B Strep test during pregnancy?",
      options: ["To check blood sugar levels", "To screen for bacterial infection", "To measure iron levels", "To monitor fetal growth"],
      correctAnswer: "To screen for bacterial infection",
    },
    {
      id: 12,
      question: "Which vitamin is essential for calcium absorption?",
      options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      correctAnswer: "Vitamin D",
    },
    {
      id: 13,
      question: "What condition is characterized by high blood pressure and protein in the urine during pregnancy?",
      options: ["Gestational diabetes", "Hyperemesis gravidarum", "Pre-eclampsia", "Placenta previa"],
      correctAnswer: "Pre-eclampsia",
    },
    {
      id: 14,
      question: "Which hormone is primarily responsible for maintaining pregnancy?",
      options: ["Estrogen", "Progesterone", "Oxytocin", "Prolactin"],
      correctAnswer: "Progesterone",
    },
    {
      id: 15,
      question: "What is the term for a baby born before 37 weeks of gestation?",
      options: ["Preterm", "Full-term", "Post-term", "Term"],
      correctAnswer: "Preterm",
    },
    {
      id: 16,
      question: "Which nutrient is most important for the prevention of anemia in pregnant women?",
      options: ["Vitamin B12", "Vitamin E", "Iron", "Magnesium"],
      correctAnswer: "Iron",
    },
    {
      id: 17,
      question: "What is the recommended daily intake of folic acid for pregnant women?",
      options: ["200 mcg", "400 mcg", "600 mcg", "800 mcg"],
      correctAnswer: "400 mcg",
    },
    {
      id: 18,
      question: "Which screening test is commonly performed in the first trimester to assess the risk of Down syndrome?",
      options: ["Amniocentesis", "Nuchal translucency scan", "Chorionic villus sampling", "Glucose tolerance test"],
      correctAnswer: "Nuchal translucency scan",
    },
    {
      id: 19,
      question: "What is a common cause of postpartum depression?",
      options: ["Lack of sleep", "Hormonal changes", "Newborn's health issues", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      id: 20,
      question: "Which practice is recommended for reducing the risk of Sudden Infant Death Syndrome (SIDS)?",
      options: ["Co-sleeping", "Placing the baby on their back to sleep", "Using soft bedding", "Covering the baby's face"],
      correctAnswer: "Placing the baby on their back to sleep",
    },
  ];

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score += 1;
      }
    });
    setScore(score);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Midwives Training Final Quiz</h2>
      </header>
      <div className="mt-4">
        <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-100 mb-2">Final Quiz:</h3>
        {questions.map((question) => (
          <div key={question.id} className="mb-4 text-xs">
            <p className="text-slate-800 dark:text-slate-100">{question.question}</p>
            {question.options.map((option) => (
              <label key={option} className="block text-slate-800 dark:text-slate-100">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  onChange={() => handleAnswerChange(question.id, option)}
                  disabled={submitted}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded text-xs"
          onClick={handleSubmit}
          disabled={submitted}
        >
          Submit
        </button>
      </div>

      {submitted && (
        <div className="mt-4 text-xs">
          <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-100">Quiz Results:</h3>
          <p className="text-slate-800 dark:text-slate-100">You scored {score} out of {questions.length}.</p>
        </div>
      )}
    </div>
  );
}

export default MidwivesTrainingModule;
