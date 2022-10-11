import styled from '@emotion/styled';

export const PreviewList = styled.ul`
  height: 46px;
  padding: 11px 0 1px;
  overflow-x: auto;
  white-space: nowrap;
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
