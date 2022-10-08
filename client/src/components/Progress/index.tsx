import React from 'react';

export const Progress = ({ widthNumber }: { [key: string]: number }) => {
  return (
    <div className="progress">
      <div
        style={{
          width: `${widthNumber}%`,
          color: 'red',
        }}
        className="progress-bar"
        role="progressbar"
      ></div>
    </div>
  );
};

export default Progress;
