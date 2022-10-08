import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IChatData } from '@typings/db';
import ChatList from '../../components/ChatList';
import ChatInput from '../../components/ChatInput';
import { useParams } from 'react-router';
import makeSection from '../../utils/makeSection';
import axios from 'axios';
import Loading from '../../components/Loading';
import Progress from '../../components/Progress';

const Room = ({ socket }: { socket: any }) => {
  const { room_id } = useParams();
  const [chatData, setChatData] = useState<IChatData[]>([]);
  const [userData, setUserData] = useState('');
  const [messages, setMessages] = useState<IChatData[]>([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef<null | HTMLDivElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [widthNumber, setWidth] = useState(0);

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
  const chatSections = makeSection(combineData ? combineData.reverse() : []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  if (!chatData || !userData) {
    return null;
  }

  const testimageDb = [
    {
      id: 1,
      imageUrls: `${process.env.PUBLIC_URL}/img-profile-1.png`,
    },
    {
      id: 2,
      imageUrls: `${process.env.PUBLIC_URL}/img-profile-3.png`,
    },
  ];

  const onUploadImageButtonClick = (e) => {
    const files = e.target.src!;
    const timer = 2000;
    const intervalNum = 100;
    const maxWidth = 100;
    const calc = maxWidth / (timer / intervalNum);
    let init = 0;

    if (!files) return;
    const readAndPreview = (file: any) => {
      setLoading(true);
      if (/\.(jpe?g|png|gif)$/i.test(file)) {
        setImages([...images, files]);

        let interval = setInterval(() => {
          init = init + calc;
          setWidth(init);
        }, intervalNum);
        setTimeout(() => {
          setLoading(false);
          clearInterval(interval);
        }, timer);
      }
    };
    if (files) {
      readAndPreview(files);
    }
  };
  /*
   axios({
      url: '/api/users/images/${user}',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
   */

  return (
    <div className="container">
      <div className="header">
        <h1>{userData}</h1>
        <Link to="/list">Back</Link>
        <div className="rightUtil">
          <ul>
            {testimageDb?.map((file: any, index: number) => (
              <li key={index}>
                <img src={file.imageUrls} alt="" onClick={onUploadImageButtonClick} />
              </li>
            ))}
          </ul>
          <button>검색</button>
        </div>
      </div>

      <div className="chatArea">
        <div className="chatListArea">
          <ChatList messages={chatSections} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
        </div>

        {images &&
          images?.map((file: any, index: number) => (
            <li key={index}>
              {loading ? (
                <>
                  <Loading />
                </>
              ) : null}
              <img src={file} alt="preview-img" />

              {loading ? (
                <>
                  <Progress widthNumber={widthNumber} />
                </>
              ) : null}
            </li>
          ))}

        <ChatInput socket={socket} />
      </div>
    </div>
  );
};

export default Room;
