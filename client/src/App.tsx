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
