import React from 'react';

export const PreviewImage = ({ images, onAddImage }) => {
  return (
    <ul>
      {images &&
        images?.map((file: any, index: number) => (
          <li key={index} onClick={onAddImage}>
            <img src={file} alt="preview-img" />
          </li>
        ))}
    </ul>
  );
};

export default PreviewImage;
