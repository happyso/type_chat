import React, { useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import List from './pages/List';
import Room from './pages/Room';

const backUrl = 'http://localhost:4000';

const socket = io(backUrl, {
  reconnectionDelayMax: 10000,
});

const App = () => {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('userName', 'soyoung'); //임시 유저 설정
    socket.emit('newUser', { userName: 'soyoung', socketID: socket.id });
  }, []);

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition key={location.pathname} classNames="fade" timeout={500} unmountOnExit appear>
        <Routes location={location}>
          <Route path="/" element={<Navigate replace to="/list" />} />
          <Route path="/list" element={<List />} />
          <Route path="/room/:roomId" element={<Room socket={socket} />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};
export default App;
