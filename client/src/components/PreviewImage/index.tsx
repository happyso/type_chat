import React from 'react';

import { PreviewList } from './styles';
import axios from 'axios';

export const PreviewImage = ({ images, socket, room_id }) => {
  const onAddImage = (e: any) => {
    const target = e.target as HTMLImageElement;
    const file = target.src;

    axios
      .post(`/api/room/images/${room_id}`, {
        id: Math.random(),
        imageUrl: file,
      })
      .then((response) => {
        console.log(response.data);
        if (localStorage.getItem('userName')) {
          socket.emit('message', {
            id: `${socket.id}${Math.random()}`,
            content: file,
            name: localStorage.getItem('userName'),
            createdAt: new Date(),
            isFile: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <PreviewList>
      {images &&
        images?.map((file: any, index: number) => (
          <li key={index}>
            <img src={file} alt="preview-img" onClick={onAddImage} />
          </li>
        ))}
    </PreviewList>
  );
};

export default PreviewImage;
