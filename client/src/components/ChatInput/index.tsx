import React, { useState, useCallback } from 'react';
import 'dayjs/locale/ko';
const ChatInput = ({ socket }: any) => {
  const [message, setMessage] = useState('');
  const handleTyping = () => socket.emit('typing', `${localStorage.getItem('userName')} is typing`);

  const handleSendMessage = useCallback(
    (e: any) => {
      e.preventDefault();

      if (message.trim() && localStorage.getItem('userName')) {
        socket.emit('message', {
          id: `${socket.id}${Math.random()}`,
          content: message,
          name: localStorage.getItem('userName'),
          createdAt: new Date(),
          socketID: socket.id,
        });
      }
      setMessage('');
    },
    [socket, message],
  );
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatInput;
