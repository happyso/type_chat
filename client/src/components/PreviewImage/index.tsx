import React from 'react';

import { PreviewList } from './styles';

export const PreviewImage = ({ images, onAddImage }) => {
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
