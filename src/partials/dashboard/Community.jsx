import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { FaPaperPlane } from 'react-icons/fa';

// const socket = io('http://localhost:3000'); // Adjust the server URL as needed

function Community() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const [replyToMessage, setReplyToMessage] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setTypingStatus(''); // Clear typing status when a message is received
    });

    socket.on('typing_status', (status) => {
      setTypingStatus(status);
    });

    return () => {
      socket.off('receive_message');
      socket.off('typing_status');
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat when a new message is added
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      const userMessage = {
        user: 'User1', // Replace with actual user info
        content: message,
        timestamp: new Date(),
        replyTo: replyToMessage ? replyToMessage.id : null,
      };

      // Send message to the server
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage.content }),
      });

      const data = await response.json();

      // Assuming the server sends a response that contains the typing status
      const botMessage = { user: 'Bot', content: data.message, timestamp: new Date(), replyTo: null };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage('');
      setReplyToMessage(null); // Clear the replyToMessage after sending
    }
  };

  const handleReply = (message) => {
    setReplyToMessage(message);
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl h-full flex flex-col">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Live Chat</h2>
      </header>
      <div className="p-3 flex flex-col flex-1">
        <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 p-4 rounded-sm overflow-y-auto flex-1">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-2 ${msg.user === 'User1' ? 'justify-end' : ''}`}>
              <div className={`flex items-start ${msg.user === 'User1' ? 'ml-2' : 'mr-2'}`}>
                <img src="/src/images/user.png" alt="Avatar" className="w-8 h-8 rounded-full" />
              </div>
              <div className={`bg-violet-500 text-white p-3 rounded-lg shadow-lg max-w-xs ${msg.user === 'User1' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                {msg.replyTo && (
                  <div className="text-xs italic mb-1">
                    Replying to: {messages.find((m) => m.id === msg.replyTo)?.content}
                  </div>
                )}
                <div className="text-xs font-semibold">{msg.user}</div>
                <div className="text-xs">{msg.content}</div>
                <div className="text-xs text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                {msg.user === 'User1' && (
                  <button onClick={() => handleReply(msg)} className="text-xs text-blue-300 mt-1">Reply</button>
                )}
              </div>
            </div>
          ))}
          {typingStatus && (
            <div className="flex mb-2 justify-center">
              <div className="bg-gray-200 text-gray-600 p-3 rounded-lg shadow-lg max-w-xs">
                {typingStatus}
              </div>
            </div>
          )}
          <div ref={chatEndRef} /> {/* This div is used to scroll to the bottom */}
        </div>
      </div>
      {replyToMessage && (
        <div className="p-2 bg-gray-200 text-xs italic">
          Replying to: {replyToMessage.content}
          <button onClick={() => setReplyToMessage(null)} className="ml-2 text-red-500">Cancel</button>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center mt-2 px-5 py-4 border-t border-gray-100 dark:border-gray-700/60">
        <input
          type="text"
          placeholder="Type your message..."
          className="text-xs p-2 border rounded-sm flex-1 dark:bg-gray-800 dark:border-gray-700"
          value={message}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="text-xs bg-blue-500 text-white p-2 rounded-sm ml-2 flex items-center justify-center"
        >
          <FaPaperPlane className="text-lg" />
        </button>
      </form>
    </div>
  );
}

export default Community;




// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';


// const socket = io('http://localhost:3000'); // Adjust the server URL as needed

// function Community() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [typingStatus, setTypingStatus] = useState('');
//   const [replyToMessage, setReplyToMessage] = useState(null);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     socket.on('receive_message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//       setTypingStatus(''); // Clear typing status when a message is received
//     });

//     socket.on('typing_status', (status) => {
//       setTypingStatus(status);
//     });

//     return () => {
//       socket.off('receive_message');
//       socket.off('typing_status');
//     };
//   }, []);

//   useEffect(() => {
//     // Scroll to the bottom of the chat when a new message is added
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (message.trim() !== '') {
//       const userMessage = {
//         user: 'User1', // Replace with actual user info
//         content: message,
//         timestamp: new Date(),
//         replyTo: replyToMessage ? replyToMessage.id : null,
//       };

//       // Send message to the server
//       const response = await fetch('http://localhost:3000/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text: userMessage.content }),
//       });

//       const data = await response.json();

//       // Assuming the server sends a response that contains the typing status
//       const botMessage = { user: 'Bot', content: data.message, timestamp: new Date(), replyTo: null };

//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setMessage('');
//       setReplyToMessage(null); // Clear the replyToMessage after sending
//     }
//   };

//   const handleReply = (message) => {
//     setReplyToMessage(message);
//   };

//   return (
//     <div className="flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-full">
//       <div className="px-5 pt-5 flex-1 flex flex-col">
//         <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Live Chat</h2>
//         <div className="chat-messages bg-slate-50 dark:bg-slate-700 p-4 rounded-sm overflow-y-auto flex-1">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex mb-2 ${msg.user === 'User1' ? 'justify-end' : ''}`}>
//               <div className={`flex items-start ${msg.user === 'User1' ? 'ml-2' : 'mr-2'}`}>
//                 <img src="/src/images/user.png" alt="Avatar" className="w-8 h-8 rounded-full" />
//               </div>
//               <div className={`bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-xs ${msg.user === 'User1' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
//                 {msg.replyTo && (
//                   <div className="text-xs italic mb-1">
//                     Replying to: {messages.find((m) => m.id === msg.replyTo)?.content}
//                   </div>
//                 )}
//                 <div className="text-xs font-semibold">{msg.user}</div>
//                 <div className="text-xs">{msg.content}</div>
//                 <div className="text-xs text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</div>
//                 {msg.user === 'User1' && (
//                   <button onClick={() => handleReply(msg)} className="text-xs text-blue-300 mt-1">Reply</button>
//                 )}
//               </div>
//             </div>
//           ))}
//           {typingStatus && (
//             <div className="flex mb-2 justify-center">
//               <div className="bg-gray-200 text-gray-600 p-3 rounded-lg shadow-lg max-w-xs">
//                 {typingStatus}
//               </div>
//             </div>
//           )}
//           <div ref={chatEndRef} /> {/* This div is used to scroll to the bottom */}
//         </div>
//       </div>
//       {replyToMessage && (
//         <div className="p-2 bg-gray-200 text-xs italic">
//           Replying to: {replyToMessage.content}
//           <button onClick={() => setReplyToMessage(null)} className="ml-2 text-red-500">Cancel</button>
//         </div>
//       )}
//       <form onSubmit={handleSendMessage} className="flex items-center mt-2">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           className="text-xs p-2 border rounded-sm flex-1 dark:bg-slate-800 dark:border-slate-700"
//           value={message}
//           onChange={handleInputChange}
//         />
//         <button
//           type="submit"
//           className="text-xs bg-blue-500 text-white p-2 rounded-sm ml-2 flex items-center justify-center"
//         >
//           <FaPaperPlane className="text-lg" />
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Community;
