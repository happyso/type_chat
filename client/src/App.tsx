import React, { useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import loadable from '@loadable/component';
import { Routes, Route, Navigate } from 'react-router-dom';

const backUrl = 'http://localhost:4000';

const socket = io(backUrl, {
  reconnectionDelayMax: 10000,
});
const List = loadable(() => import('./pages/List')); //코드 스플리팅
const Room = loadable(() => import('./pages/Room'));

const App = () => {
  useEffect(() => {
    localStorage.setItem('userName', 'soyoung'); //임시 유저 설정
    socket.emit('newUser', { userName: 'soyoung', socketID: socket.id });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/list" />} />
      <Route path="/list" element={<List />} />
      <Route path="/room/:room_id" element={<Room socket={socket} />} />
    </Routes>
  );
};
export default App;

//todo

// list view router
// room view router
// list 전송한 메세지, 읽지 않은 메세지 갯수, 마시막메세지 , unreads
// get api/list 채팅방 리스트 불러움
// get api/room/:room_id/chat/ 해당 채팅방의 대화내용 가져옴
// get api/user/:id 유저 정보 가져옴
// get api/user/:id/images 보낸 이미지 가져옴..
//
//

// init room localstorage에 기존 채팅내용 get 하기
