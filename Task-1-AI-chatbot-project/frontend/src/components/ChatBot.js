import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import './ChatBot.css';

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello 👋 I am your AI Chatbot!'
    }
  ]);

  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);

    const currentInput = input;
    setInput('');
     setTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: currentInput
      });

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: response.data.reply
          }
        ]);

        setTyping(false);
      }, 1000);

    } catch (error) {
      setTyping(false);

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Server Error ❌'
        }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">

      <div className="chat-header">
        AI Rule-Based Chatbot 🤖
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            text={msg.text}
          />
        ))}

        {typing && (
          <div className="typing">
            Bot is typing...
             </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>

    </div>
  );
}

export default ChatBot;