import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../auth/firebase-config.js';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required')
});

const CodeVerificationSchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required')
});

function ForgotPasswordPage() {
  const [step, setStep] = useState('requestCode');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      setStatus({ success: "Password reset email sent! Please check your inbox." });
      setEmail(values.email);
      setStep('verifyCode'); // Update this based on your flow
    } catch (error) {
      console.error("Password reset error:", error);
      setStatus({ error: "Failed to send password reset email. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (values, { setSubmitting, setStatus }) => {
    try {
      await axios.post("http://localhost/api/users/reset-password", {
        email,
        code: values.code,
        newPassword: values.newPassword
      });
      setStatus({ success: "Password successfully reset!" });
      setTimeout(() => {
        navigate('/SignIn');
      }, 2000);
    } catch (error) {
      console.error("Password reset error:", error);
      setStatus({ error: "Failed to reset password. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
            {step === 'requestCode' ? 'Forgot Password' : 'Enter Code and Reset Password'}
          </h2>
        </header>

        {step === 'requestCode' ? (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema}
            // handling reset password logic
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                    disabled={isSubmitting}
                  >
                    Send Code
                  </button>
                </div>
                {status && status.success && (
                  <div className="mt-4 text-green-500 text-sm text-center">
                    {status.success}
                  </div>
                )}
                {status && status.error && (
                  <div className="mt-4 text-red-500 text-sm text-center">
                    {status.error}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ code: '', newPassword: '' }}
            validationSchema={CodeVerificationSchema}
            onSubmit={handleReset}
          >
            {({ isSubmitting, status }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Code
                  </label>
                  <Field
                    type="text"
                    name="code"
                    id="code"
                    className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    New Password
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                    disabled={isSubmitting}
                  >
                    Reset Password
                  </button>
                </div>
                {status && status.success && (
                  <div className="mt-4 text-green-500 text-sm text-center">
                    {status.success}
                  </div>
                )}
                {status && status.error && (
                  <div className="mt-4 text-red-500 text-sm text-center">
                    {status.error}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        )}
        <div className="mt-4 text-center">
          <a
            href="/SignIn"
            className="text-sm text-blue-500 hover:underline"
          >
            Remembered your password? Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
