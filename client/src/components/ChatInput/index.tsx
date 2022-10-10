import React, { useState, useCallback } from 'react';
import { ReactComponent as Send } from '../../assets/img-send.svg';
import { ChatFooter } from './styles';

const ChatInput = ({ socket }: any) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (message.trim() && localStorage.getItem('userName')) {
        socket.emit('message', {
          id: `${socket.id}${Math.random()}`,
          content: message,
          name: localStorage.getItem('userName'),
          createdAt: new Date(),
          isFile: false,
        });
      }
      setMessage('');
    },
    [socket, message],
  );
  return (
    <ChatFooter>
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="메시지를 입력하세요.."
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn-send">
          <Send />
        </button>
      </form>
    </ChatFooter>
  );
};

export default ChatInput;
