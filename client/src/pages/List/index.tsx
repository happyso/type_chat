import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');
interface IChatList {
  id: number;
  imageUrls: string;
  content: string;
  SenderId: string;
  Sender: string;
  createdAt: Date;
  unreadChat: number;
}
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
  const userName = localStorage.getItem('userName');
  useEffect(() => {
    axios
      .get(`/api/${userName}/list`, { withCredentials: true })
      .then((response) => {
        setListData(response.data);
      })
      .catch((error) => {
        console.log(`Something Wrong: ${error}`);
      });
  }, [userName]);

  return (
    <div className="roomList">
      {listData?.map((chatItem: any) => (
        <NavLink key={chatItem.id} to={`/room/${chatItem.SenderId}`}>
          <div className="chat-img">
            <img src={chatItem.imageUrls} alt={chatItem.SenderId} />
          </div>
          <span>{chatItem.content}</span>
          <span>{getDate(chatItem.createdAt)}</span>
          {chatItem.unreadChat && <span className="unreadCount">{chatItem.unreadChat}</span>}
        </NavLink>
      ))}
    </div>
  );
};

export default List;
