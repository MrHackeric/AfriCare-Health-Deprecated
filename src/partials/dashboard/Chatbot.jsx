import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [url, setUrl] = useState('');

  const sendMessage = async () => {
    if (!url.trim()) return;

    const userMessage = { sender: 'user', text: url.trim() };

    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userMessage.text }),
    });

    const data = await response.json();
    const botMessage = { sender: 'bot', text: data.response };

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setUrl('');
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl h-full flex flex-col">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chatbot</h2>
      </header>
      <div className="p-3 flex flex-col flex-1">
        <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 p-4 rounded-sm overflow-y-auto flex-1">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
              <span className={`inline-block p-2 rounded-md ${msg.sender === 'bot' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-500 text-white'}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="pt-4 flex space-x-2">
          <input
            type="text"
            placeholder="Interact with AfriCare Chatbot for assistance..."
            className="p-2 border rounded-sm flex-grow dark:bg-gray-800 dark:border-gray-700"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-sm"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
