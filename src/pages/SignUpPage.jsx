import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../auth/firebase-config.js';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({});

  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const firebaseUser = userCredential.user;

      // Send user data to your backend to register the user
      const response = await axios.post("http://192.168.1.123:5000/api/users/register", {
        firebaseUid: firebaseUser.uid,
        name: values.name,
        email: values.email
      });

      console.log("Response from server:", response);
      setStatus({ success: "Registered successfully!" });
      navigate("/SignIn");
    } catch (error) {
      console.error("Sign Up error:", error.response ? error.response.data : error.message);
      setStatus({ error: "Sign Up failed. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Get ID token from the user
      const token = await firebaseUser.getIdToken();

      // Send token to the backend
      const response = await axios.post('http://192.168.1.123:5000/api/users/google-sign', { token });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(firebaseUser));

      setStatus({ success: "Logged in successfully!" });

      // Redirect to dashboard or another page
      navigate("/Dashboard");
    } catch (error) {
      console.error("Google Sign In error:", error);
      setStatus({ error: "Sign In with Google failed. Please try again later." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
            Sign Up for AfriCare
          </h2>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-100"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
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
              {status && status.success && <div className="mb-4 text-green-500 text-sm">{status.success}</div>}
              {status && status.error && <div className="mb-4 text-red-500 text-sm">{status.error}</div>}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
                <a
                  href="/SignIn"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Already have an account? Sign In
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
                  onClick={handleGoogleSignIn}
                >
                  <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google Logo"
                    className="mr-2"
                  />
                  Sign up with Google
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
