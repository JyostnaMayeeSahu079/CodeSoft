import React from 'react';

function Message({ sender, text }) {
  return (
    <div className={sender === 'user' ? 'user-message' : 'bot-message'}>
      {text}
    </div>
  );
}

export default Message;