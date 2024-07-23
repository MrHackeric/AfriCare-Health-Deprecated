import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import MidwivesPage from './pages/MidwivesPage';
import Emergencies from './pages/Emergencies';
import CommunityPage from './pages/CommunityPage';
import ChatbotPage from './pages/ChatbotPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPassword';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<SignUpPage />} />
        <Route exact path="/SignIn" element={<SignInPage />} />
        <Route exact path="/ForgotPassword" element={<ForgotPasswordPage />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/Midwives" element={<MidwivesPage />} />
        <Route exact path="/Emergency" element={<Emergencies />} />
        <Route exact path="/Community" element={<CommunityPage />} />
        <Route exact path="/Chatbot" element={<ChatbotPage />} />
        </Routes>
    </>
  );
}

export default App;
