import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../images/Animation.json'; // replace with your actual Lottie animation file
import { FaShare, FaCopy, FaDownload, FaStar, FaRegStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);
  const [showStarred, setShowStarred] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(() => !localStorage.getItem('isReturningUser'));
  const [name, setName] = useState(() => localStorage.getItem('userName') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('userEmail') || '');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(() => !!localStorage.getItem('isReturningUser'));
  const [caption, setCaption] = useState('');
  const [sampleQuestionsVisible, setSampleQuestionsVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const sampleQuestionsRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sampleQuestionsRef.current && !sampleQuestionsRef.current.contains(event.target)) {
        setSampleQuestionsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: 'user', text: text.trim(), timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
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

  const handleStarMessage = (message) => {
    const isStarred = starredMessages.some((msg) => msg.timestamp === message.timestamp);
    if (isStarred) {
      setStarredMessages((prev) => prev.filter((msg) => msg.timestamp !== message.timestamp));
    } else {
      setStarredMessages((prev) => [...prev, message]);
    }
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    alert('Message copied to clipboard!');
  };

  const handleDownloadMessage = (text) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'message.txt';
    document.body.appendChild(element);
    element.click();
  };

  const handleShareMessage = (text) => {
    if (navigator.share) {
      navigator.share({
        title: 'AfriCare Chatbot Message',
        text: text,
      });
    } else {
      alert('Share not supported in your browser.');
    }
  };

  const handleSampleQuestionClick = (question) => {
    setCaption(question);
  };

  const formatText = (text) => {
    return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(caption);
      setCaption('');
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
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl flex flex-col h-full relative" ref={chatContainerRef}>
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chatbot</h2>
      </header>
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'bot' ? 'text-left' : 'text-right'} my-2`}>
              <span
                className={`inline-block p-2 rounded-md max-w-md ${msg.sender === 'bot' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-500 text-white'}`}
                dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
              />
              <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()} - {new Date(msg.timestamp).toLocaleDateString()}
              </div>
              {!error && msg.sender === 'bot' && (
                <div className="flex space-x-2 mt-1">
                  <button onClick={() => handleShareMessage(msg.text)}>
                    <FaShare className="text-gray-500 dark:text-gray-300" />
                  </button>
                  <button onClick={() => handleCopyMessage(msg.text)}>
                    <FaCopy className="text-gray-500 dark:text-gray-300" />
                  </button>
                  <button onClick={() => handleDownloadMessage(msg.text)}>
                    <FaDownload className="text-gray-500 dark:text-gray-300" />
                  </button>
                  <button onClick={() => handleStarMessage(msg)}>
                    {starredMessages.some((starredMsg) => starredMsg.timestamp === msg.timestamp) ? (
                      <FaStar className="text-yellow-500" />
                    ) : (
                      <FaRegStar className="text-gray-500 dark:text-gray-300" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
          {error && (
            <div className="text-center text-red-500">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-gray-100 dark:border-gray-700/60 p-4 bg-gray-50 dark:bg-gray-800 flex flex-col space-y-2">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="p-2 border rounded-sm h-24 resize-none dark:bg-gray-800 dark:border-gray-700"
          />
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSampleQuestionsVisible(!sampleQuestionsVisible)}
              className="text-blue-500 dark:text-blue-400"
            >
              {sampleQuestionsVisible ? 'Hide Sample Questions' : 'Show Sample Questions'}
            </button>
            <button
              onClick={() => sendMessage(caption)}
              className="bg-blue-500 text-white p-2 rounded-sm"
            >
              Send
            </button>
          </div>
          {sampleQuestionsVisible && (
            <div ref={sampleQuestionsRef} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-sm mt-2 absolute z-10">
              <h4 className="font-semibold mb-2">Sample Questions:</h4>
              <ul>
                <li><button onClick={() => handleSampleQuestionClick('What are the early signs of pregnancy?')}>What are the early signs of pregnancy?</button></li>
                <li><button onClick={() => handleSampleQuestionClick('How can I prepare for a healthy pregnancy?')}>How can I prepare for a healthy pregnancy?</button></li>
                <li><button onClick={() => handleSampleQuestionClick('What are common prenatal vitamins and their benefits?')}>What are common prenatal vitamins and their benefits?</button></li>
                <li><button onClick={() => handleSampleQuestionClick('What should I include in my birth plan?')}>What should I include in my birth plan?</button></li>
                <li><button onClick={() => handleSampleQuestionClick('How can I manage stress and anxiety during pregnancy?')}>How can I manage stress and anxiety during pregnancy?</button></li>
              </ul>
            </div>
          )}
          {showStarred && (
            <div className="p-2 border rounded-md mb-2 bg-gray-100 dark:bg-gray-900">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Starred Messages</h3>
              {starredMessages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <span className="block p-2 rounded-md max-w-md bg-gray-200 dark:bg-gray-700">{msg.text}</span>
                </div>
              ))}
              <button
                onClick={() => setShowStarred(false)}
                className="text-blue-500 dark:text-blue-400 mt-2"
              >
                <FaChevronUp />
              </button>
            </div>
          )}
          {!showStarred && (
            <button
              onClick={() => setShowStarred(true)}
              className="text-blue-500 dark:text-blue-400"
            >
              <FaChevronDown /> Show Starred Messages
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
