import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../auth/firebase-config.js';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const handleSubmit = async (values, { setSubmitting, setStatus }, navigate) => {
  try {
    // Sign in with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken();

    // Initialize Firestore
    const db = getFirestore();

    // Fetch additional user data from Firestore (if stored)
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    // Store token and user data locally
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ uid: firebaseUser.uid, email: firebaseUser.email, ...userData }));

    setStatus({ success: 'Logged in successfully!' });
    navigate('/Dashboard');
  } catch (error) {
    console.error('Login error:', error.message);
    setStatus({ error: 'Login failed. Please try again later.' });
  } finally {
    setSubmitting(false);
  }
};

export const handleGoogleSignIn = async (navigate, setStatus) => {
  const provider = new GoogleAuthProvider();
  try {
    // Sign in with Google
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // Get ID token from the user
    const token = await firebaseUser.getIdToken();

    // Initialize Firestore
    const db = getFirestore();

    // Check if the user exists in Firestore, if not, create a new document
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Add user to Firestore if they do not already exist
      await setDoc(userDocRef, {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        // Add other fields as necessary
      });
    }

    // Store token and user information in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      // Add other user info as needed
    }));

    setStatus({ success: 'Logged in successfully!' });

    // Redirect to dashboard or another page
    navigate('/Dashboard');
  } catch (error) {
    console.error('Google Sign-In error:', error.message);
    setStatus({ error: 'Sign In with Google failed. Please try again later.' });
  }
};
