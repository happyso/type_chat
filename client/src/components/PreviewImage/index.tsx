import React from 'react';

export const PreviewImage = ({ images, onAddImage }) => {
  return (
    <ul className="previewList">
      {images &&
        images?.map((file: any, index: number) => (
          <li key={index}>
            <img src={file} alt="preview-img" onClick={onAddImage} />
          </li>
        ))}
    </ul>
  );
};

export default PreviewImage;
