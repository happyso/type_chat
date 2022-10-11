import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IChatList } from '@typings/db';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { ReactComponent as Menu } from '../../assets/img-menu.svg';
import { ReactComponent as Mypage } from '../../assets/img-mypage.svg';
import { Header, RoomList } from './styles';
dayjs.locale('ko');

const userName = localStorage.getItem('userName');

const List = () => {
  const [listData, setListData] = useState<IChatList[]>();
  const getDate = (targetDate: string) => {
    const now = dayjs();
    if (now.diff(targetDate, 'day') !== 0) {
      return dayjs(targetDate).format('dddd');
    } else {
      return dayjs(targetDate).format('A hh:mm');
    }
  };

  useEffect(() => {
    axios
      .get(`/api/${userName}/list`, { withCredentials: true })
      .then((response) => {
        setListData(response.data);
      })
      .catch((error) => {
        console.log(`Something Wrong: ${error}`);
      });
  }, []);

  return (
    <div className="container">
      <Header>
        <h1>채팅</h1>
        <button className="btn-menu">
          <Menu width="24" height="24" />
        </button>
        <Link to="#none" className="btn-mypage">
          <Mypage />
        </Link>
      </Header>
      <RoomList>
        {listData?.map((chatItem: IChatList) => (
          <Link className="fade-list" key={chatItem.id} to={`/room/${chatItem.SenderId}`}>
            <div className="chat-img">
              <img src={chatItem.imageUrls} alt={chatItem.SenderId} />
            </div>
            <div className="chat-desc">
              <strong>{chatItem.Sender}</strong>
              <span>{chatItem.content}</span>
              <span className="date">{getDate(chatItem.createdAt)}</span>
              {chatItem.unreadChat && <span className="unreadCount">{chatItem.unreadChat}</span>}
            </div>
          </Link>
        ))}
      </RoomList>
    </div>
  );
};

export default List;
