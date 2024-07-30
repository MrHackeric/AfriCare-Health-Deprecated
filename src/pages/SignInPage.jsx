import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

function SignInPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState({});

  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', values);
      console.log(values);
      const { token, user } = response.data;

      const saveData = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      };
      saveData(token, user);
      setStatus({ success: "Logged in successfully!" });

      // Redirect to dashboard
      setTimeout(() => {
        setStatus({});
        navigate(user.email === 'admin@gmail.com' && user.password === 'admin101' ? '/adminDashboard' : '/Dashboard');
      }, 2000);

    } catch (error) {
      console.error("SignIn error:", error);
      setStatus({ error: "Login Failed. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
            Welcome to AfriCare
          </h2>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({ isSubmitting }) => (
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
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {status.success && (
                <div className="mb-4 text-green-500 text-sm">
                  Logged in successfully!
                </div>
              )}
              {status.error && (
                <div className="mb-4 text-red-500 text-sm">
                  {status.error}
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
                <a
                  href="/ForgotPassword"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="/"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Don't have an account? Sign Up
                </a>
              </div>
              <div className="mt-6 flex items-center justify-center">
                <div className="w-full border-t border-gray-300"></div>
                <span className="px-2 text-gray-500">OR</span>
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
                  onClick={() => {
                    // Implement sign-in with Google logic here
                  }}
                >
                  <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google Logo"
                    className="mr-2"
                  />
                  Sign in with Google
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignInPage;
