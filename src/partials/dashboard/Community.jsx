import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function Community() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log('Received message:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('typing', () => {
      setIsTyping(true);
    });

    socket.on('stop typing', () => {
      setIsTyping(false);
    });

    return () => {
      socket.off('chat message');
      socket.off('typing');
      socket.off('stop typing');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const message = { sender: 'user', text: input.trim(), timestamp: new Date() };
      socket.emit('chat message', message);
      socket.emit('stop typing');
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput('');
    }
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim()) {
      socket.emit('typing');
    } else {
      socket.emit('stop typing');
    }
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl h-[500px] flex flex-col">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chat with other Community Members</h2>
      </header>
      <div className="p-3 flex flex-col flex-1 relative">
        <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 p-4 rounded-sm overflow-y-auto flex-1">
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
          {isTyping && (
            <div className="text-gray-500 dark:text-gray-300 my-2">
              Someone is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="pt-4 flex space-x-2">
          <input
            type="text"
            placeholder="Interact with other Community members..."
            className="p-2 border rounded-sm flex-grow dark:bg-gray-800 dark:border-gray-700"
            value={input}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="bg-blue-500 text-white p-2 rounded-sm" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Community;
