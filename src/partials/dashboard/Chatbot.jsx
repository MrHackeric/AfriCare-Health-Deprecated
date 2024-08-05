import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../images/Animation.json'; // replace with your actual Lottie animation file

function Chatbot() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(() => !localStorage.getItem('isReturningUser'));
  const [name, setName] = useState(() => localStorage.getItem('userName') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('userEmail') || '');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(() => !!localStorage.getItem('isReturningUser'));
  const [caption, setCaption] = useState('');
  const [isCaptioning, setIsCaptioning] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: 'user', text: text.trim(), timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUrl('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response, timestamp: new Date() };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setError('Oops! Something went wrong. Please try again later. 🌟💬✨');
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingSubmit = () => {
    if (name.trim() && email.trim()) {
      localStorage.setItem('isReturningUser', 'true');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      setIsOnboardingComplete(true);
      const welcomeMessage = { sender: 'bot', text: `Welcome, ${name}! 🎉 How can I assist you today?`, timestamp: new Date() };
      setMessages([welcomeMessage]);
    }
  };

  if (isNewUser && !isOnboardingComplete) {
    return (
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl flex flex-col h-full">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chatbot</h2>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-5">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={150}
            width={150}
          />
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Welcome to AfriCare! 🎉</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Let's get you started. Please provide your name and email address.</p>
          <input
            type="text"
            placeholder="Your Name"
            className="p-2 border rounded-sm mb-2 w-full dark:bg-gray-800 dark:border-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-2 border rounded-sm mb-2 w-full dark:bg-gray-800 dark:border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-sm w-full"
            onClick={handleOnboardingSubmit}
          >
            Start Chatting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl flex flex-col h-full">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chatbot</h2>
      </header>
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'bot' ? 'text-left' : 'text-right'} my-2`}>
              <span className={`inline-block p-2 rounded-md max-w-md ${msg.sender === 'bot' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-500 text-white'}`}>
                {msg.text}
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message text-left my-2">
              <span className="inline-block p-2 rounded-md bg-gray-200 dark:bg-gray-700 max-w-md">
                Loading...
              </span>
            </div>
          )}
          {error && (
            <div className="message text-left my-2">
              <span className="inline-block p-2 rounded-md bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100 max-w-md">
                {error}
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div><br></br></div>
        <div className="flex flex-col space-y-4 absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700/60">
          {isCaptioning && (
            <div className="p-3 border-t border-gray-100 dark:border-gray-700/60">
              <textarea
                placeholder="Add a caption for your media..."
                className="p-2 border rounded-sm w-full dark:bg-gray-800 dark:border-gray-700"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white p-2 rounded-sm mt-2"
                onClick={() => {
                  if (caption.trim()) {
                    const userMessage = { sender: 'user', text: caption, timestamp: new Date() };
                    setMessages((prevMessages) => [...prevMessages, userMessage]);
                    setCaption('');
                    setIsCaptioning(false);
                  }
                }}
              >
                Send Caption
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-sm mt-2"
                onClick={() => {
                  setCaption('');
                  setIsCaptioning(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex space-x-2 p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700/60">
        <input
          type="text"
          placeholder="Interact with AfriCare Chatbot for assistance..."
          className="p-2 border rounded-sm flex-grow dark:bg-gray-800 dark:border-gray-700"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(url)}
        />
        <button className="bg-blue-500 text-white p-2 rounded-sm" onClick={() => sendMessage(url)}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
