import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../../auth/firebase-config.js";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export const handleSubmit = async (
  values,
  { setSubmitting, setStatus },
  navigate
) => {
  try {
    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const firebaseUser = userCredential.user;

    // Initialize Firestore
    const db = getFirestore();

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", firebaseUser.uid), {
      name: values.name,
      email: values.email,
      // Add other fields from the form as needed
    });

    setStatus({ success: "Registered successfully!" });
    navigate("/SignIn");
  } catch (error) {
    console.error("Sign Up error:", error.message);
    setStatus({ error: "Sign Up failed. Please try again later." });
  } finally {
    setSubmitting(false);
  }
};

export const handleGoogleSignIn = async (navigate, setStatus) => {
  const auth = getAuth(); // Initialize Firebase Auth
  const provider = new GoogleAuthProvider();

  try {
    // Sign in with Google
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // Initialize Firestore
    const db = getFirestore();

    // Check if the user exists in Firestore
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // If user does not exist, create a new user document
      await setDoc(userDocRef, {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified, // Store email verification status
        // Add other fields as necessary
      });

      // Send email verification if email is not verified
      if (!firebaseUser.emailVerified) {
        await sendEmailVerification(firebaseUser);
        setStatus({ success: "Account created! Please verify your email." });
      } else {
        setStatus({ success: "Logged in successfully!" });
      }
    } else {
      setStatus({ success: "Logged in successfully!" });
    }

    // Redirect to dashboard or another page
    navigate("/Dashboard");
  } catch (error) {
    console.error("Google Sign-In error:", error.message);
    setStatus({ error: "Sign In with Google failed. Please try again later." });
  }
};
