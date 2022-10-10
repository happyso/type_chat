import styled from '@emotion/styled';

export const PreviewList = styled.ul`
  height: 46px;
  padding: 11px;

  overflow-x: auto;
  white-space: nowrap;

  position: absolute;
  left: 0;
  top: 44px;
  right: 0;
  z-index: 1;

  background-color: var(--point-color);

  text-align: left;
  li {
    display: inline-block;
    margin: 0 5px;
    img {
      width: 46px;
      height: 46px;
      border-radius: 5px;
      overflow: hidden;
    }
  }
`;
