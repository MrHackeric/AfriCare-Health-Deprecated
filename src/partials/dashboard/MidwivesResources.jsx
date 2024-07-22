import React from 'react';

function AdvancedMidwivesTrainingModule() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Advanced Midwives Training Module</h2>
      </header>

      {/* Detailed Notes */}
      <div className="mt-4">
        <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-100 mb-2">Detailed Notes</h3>
        <p className="text-xs text-gray-800 dark:text-gray-100 mb-4">
          This module provides comprehensive information on advanced maternal care, focusing on both medical and emotional aspects of midwifery. The topics covered include high-risk pregnancies, emergency interventions, advanced neonatal care, and mental health support for new mothers.
        </p>
        <p className="text-xs text-gray-800 dark:text-gray-100 mb-4">
          <strong>High-Risk Pregnancies:</strong> Understanding the factors that contribute to high-risk pregnancies, such as maternal age, pre-existing medical conditions, and multiple pregnancies. This section also covers management strategies and monitoring techniques to ensure the safety of both mother and baby.
        </p>
        <p className="text-xs text-gray-800 dark:text-gray-100 mb-4">
          <strong>Emergency Interventions:</strong> Detailed protocols for handling emergencies during labor and delivery, including hemorrhage control, managing pre-eclampsia, and neonatal resuscitation techniques.
        </p>
        <p className="text-xs text-gray-800 dark:text-gray-100 mb-4">
          <strong>Advanced Neonatal Care:</strong> Providing care for preterm and low birth weight infants, understanding the importance of kangaroo care, and managing common neonatal complications such as jaundice and respiratory distress syndrome.
        </p>
        <p className="text-xs text-gray-800 dark:text-gray-100 mb-4">
          <strong>Mental Health Support:</strong> Identifying signs of postpartum depression and anxiety, offering appropriate referrals, and providing emotional support to new mothers. This section emphasizes the importance of holistic care that includes mental well-being.
        </p>
      </div>

      {/* Revision Materials */}
      <div className="mt-4">
        <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-100 mb-2">Revision Materials</h3>
        <ul className="list-disc list-inside text-xs text-gray-800 dark:text-gray-100 mb-4">
          <li>Summary sheets for each topic covered in the detailed notes.</li>
          <li>Key points and checklists for quick review before exams or practical assessments.</li>
          <li>Sample case studies with questions and answers for practice.</li>
        </ul>
      </div>

      {/* Resources */}
      <div className="mt-4">
        <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-100 mb-2">Resources</h3>
        <ul className="list-disc list-inside text-xs text-gray-800 dark:text-gray-100 mb-4">
          <li>
            <a href="https://www.who.int/maternal_health" className="text-blue-500 dark:text-blue-400" target="_blank" rel="noopener noreferrer">World Health Organization: Maternal Health</a>
          </li>
          <li>
            <a href="https://www.marchofdimes.org/complications/high-risk-pregnancy.aspx" className="text-blue-500 dark:text-blue-400" target="_blank" rel="noopener noreferrer">March of Dimes: High-Risk Pregnancy</a>
          </li>
          <li>
            <a href="https://www.postpartum.net/" className="text-blue-500 dark:text-blue-400" target="_blank" rel="noopener noreferrer">Postpartum Support International</a>
          </li>
          <li>
            <a href="https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/01/optimizing-postpartum-care" className="text-blue-500 dark:text-blue-400" target="_blank" rel="noopener noreferrer">ACOG: Optimizing Postpartum Care</a>
          </li>
        </ul>
      </div>

      {/* Recommendations */}
      <div className="mt-4">
        <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-100 mb-2">Recommendations</h3>
        <p className="text-xs text-gray-800 dark:text-gray-100 mb-4">
          To ensure the best outcomes for mothers and infants, it is recommended that midwives:
        </p>
        <ul className="list-disc list-inside text-xs text-gray-800 dark:text-gray-100 mb-4">
          <li>Stay updated with the latest guidelines and research in maternal and neonatal care.</li>
          <li>Engage in continuous professional development and training programs.</li>
          <li>Build strong communication and support networks with other healthcare professionals.</li>
          <li>Advocate for the mental health and emotional well-being of mothers.</li>
          <li>Utilize available resources and tools to enhance the quality of care provided.</li>
        </ul>
      </div>
    </div>
  );
}

export default AdvancedMidwivesTrainingModule;
