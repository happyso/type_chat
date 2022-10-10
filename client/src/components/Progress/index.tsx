import React from 'react';
import { ProgressBar } from './styles';
export const Progress = ({ widthNumber }: { [key: string]: number }) => {
  return (
    <ProgressBar>
      <div
        style={{
          width: `${widthNumber}%`,
        }}
        className="progress-bar"
        role="progressbar"
      ></div>
    </ProgressBar>
  );
};

export default Progress;
