import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IChatData } from '@typings/db';
import ChatList from '../../components/ChatList';
import ChatInput from '../../components/ChatInput';
import { useParams } from 'react-router';
import makeSection from '../../utils/makeSection';
import axios from 'axios';

const Room = ({ socket }: { socket: any }) => {
  const { room_id } = useParams();
  const [chatData, setChatData] = useState<IChatData[]>([]);
  const [userData, setUserData] = useState('');
  const [messages, setMessages] = useState<IChatData[]>([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/api/users/${room_id}`, { withCredentials: true })
      .then((response) => {
        setUserData(response.data.nickname);
      })
      .catch((error) => {
        console.log(`Something Wrong: ${error}`);
      });
  }, [room_id]);

  useEffect(() => {
    axios
      .get(`/api/room/${room_id}`, { withCredentials: true })
      .then((response) => {
        setChatData(response.data);
      })
      .catch((error) => {
        console.log(`Something Wrong: ${error}`);
      });
  }, [room_id]);

  useEffect(() => {
    socket.on('messageResponse', (data: any) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on('typingResponse', (data: any) => setTypingStatus(data));
  }, [socket]);

  const combineData = chatData.concat(messages);
  const chatSections = makeSection(combineData ? combineData : []);
  console.log(chatSections);

  // useEffect(() => {
  //   // 👇️ scroll to bottom every time messages change
  //   lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  if (!chatData || !userData) {
    return null;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>{userData}</h1>
        <Link to="/list">Back</Link>
        <div className="rightUtil">
          <button>이미지 업로드</button>
          <button>검색</button>
        </div>
      </div>
      <div className="chatArea">
        <ChatList messages={chatSections} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
        <ChatInput socket={socket} />
      </div>
    </div>
  );
};

export default Room;
