import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IChatData } from '@typings/db';
import ChatList from '../../components/ChatList';
import ChatInput from '../../components/ChatInput';
import { useParams } from 'react-router';
import makeSection from '../../utils/makeSection';
import axios from 'axios';

import PreviewImage from '../../components/PreviewImage';
import Progress from '../../components/Progress';
import Loading from '../../components/Loading';
import { Header } from '../../pages/List/styles';
import { ChatBox, ChatListArea, Util } from './styles';
import { ReactComponent as Back } from '../../assets/img-back.svg';
import { ReactComponent as Upload } from '../../assets/img-upload.svg';
import { ReactComponent as Search } from '../../assets/img-search.svg';

const Room = ({ socket }: { socket: any }) => {
  const { room_id } = useParams();
  const [chatData, setChatData] = useState<IChatData[]>([]);
  const [userData, setUserData] = useState('');

  const [messages, setMessages] = useState<IChatData[]>([]);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  const [images, setImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadImage, setLoadImage] = useState('');
  const [widthNumber, setWidth] = useState(0);
  const [imageMenu, setImageMenu] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
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
    lastMessageRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;

    const readAndPreview = (file: any) => {
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prev) => [...prev, reader.result as string]);
          setImageMenu(true);
        };
        reader.readAsDataURL(file);
      }
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };

  const onAddImage = (e: any) => {
    const target = e.target as HTMLImageElement;
    const file = target.src;
    if (loading) return null;
    axios
      .post(`/api/room/images/${room_id}`, {
        id: Math.random(),
        imageUrl: file,
      })

      .then((response) => {
        console.log(response.data);
        const timer = 1000;
        const intervalNum = 100;
        const maxWidth = 100;
        const calc = maxWidth / (timer / intervalNum);
        let init = 0;

        setLoading(true);
        setLoadImage(file);
        let interval = setInterval(() => {
          init = init + calc;
          setWidth(init);
        }, intervalNum);
        setTimeout(() => {
          setLoading(false);
          clearInterval(interval);
          socket.emit('message', {
            id: `${socket.id}${Math.random()}`,
            content: file,
            name: localStorage.getItem('userName'),
            createdAt: new Date(),
            isFile: true,
          });
        }, timer);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!chatData || !userData) {
    return null;
  }

  const combineData = chatData.concat(messages);
  const chatSections = makeSection(combineData ? combineData.reverse() : []);

  return (
    <div className="container">
      <Header>
        <h1>{userData}</h1>
        <Link to="/list" className="btn-back">
          <Back />
        </Link>
        <Util>
          <div>
            {imageMenu ? (
              <button
                className="btn-close"
                onClick={() => {
                  setImageMenu(false);
                }}
              >
                <Upload />
              </button>
            ) : (
              <>
                <input
                  type="file"
                  multiple
                  name="image"
                  accept=".png, .jpg, jpeg"
                  ref={inputRef}
                  onChange={onUploadImage}
                />
                <button className="btn-upload" onClick={onUploadImageButtonClick}>
                  <Upload />
                </button>
              </>
            )}
          </div>
          <Link to="#none" className="btn-search">
            <Search />
          </Link>
        </Util>
        {imageMenu ? <PreviewImage images={images} onAddImage={onAddImage} /> : null}
      </Header>

      <ChatBox>
        <ChatListArea>
          <ChatList messages={chatSections} lastMessageRef={lastMessageRef} />
        </ChatListArea>

        {loading ? (
          <div className="beforePostImage">
            <div className="img-box">
              <Loading />
              <img src={loadImage} alt="preview-img" />
              <Progress widthNumber={widthNumber} />
            </div>
          </div>
        ) : null}

        <ChatInput socket={socket} />
      </ChatBox>
    </div>
  );
};

export default Room;

/*
feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
fix : 기능에 대한 버그 수정
build : 빌드 관련 수정
chore : 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
ci : CI 관련 설정 수정
docs : 문서(주석) 수정
style : 코드 스타일, 포맷팅에 대한 수정
refactor : 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경
test : 테스트 코드 추가/수정
release : 버전 릴리즈
Subject
*/
