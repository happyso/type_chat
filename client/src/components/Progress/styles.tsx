import styled from '@emotion/styled';

export const ProgressBar = styled.div`
  height: 6px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  background-color: #e5e5e7;
  border-radius: 3px;
  -webkit-box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);

  .progress-bar {
    float: left;
    width: 0%;
    height: 100%;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    background-color: var(--point-color);
    -webkit-box-shadow: inset 0 -1px 0 rgb(0 0 0 / 15%);
    box-shadow: inset 0 -1px 0 rgb(0 0 0 / 15%);
  }
`;
