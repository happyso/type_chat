import React from 'react';
import { Load } from './styles';
import { ReactComponent as Close } from '../../assets/img-close.svg';

export const Loading = () => {
  return (
    <Load>
      <button>
        <Close></Close>
      </button>
    </Load>
  );
};

export default Loading;
