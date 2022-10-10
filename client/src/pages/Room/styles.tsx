import styled from '@emotion/styled';

export const ChatBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: var(--pale-grey);
  min-height: 0;
  position: relative;
  section {
    display: flex;
    flex-direction: column-reverse;
    padding: 10px 0;
  }

  .upload-img-list {
    li {
      img {
        width: 200px;
        height: 200px;
        border-radius: 12px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
  .beforePostImage {
    margin: 10px 16px 10px;

    text-align: right;
    .img-box {
      display: inline-block;
      width: 200px;
      height: 200px;
      padding: 0 0 12px;
      position: relative;
    }
    img {
      max-width: 100%;
      border-radius: 12px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;

export const ChatListArea = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-flow: column nowrap;
`;

export const Util = styled.div`
  font-size: 24px;
  position: absolute;
  right: 12px;
  top: 10px;
  height: 24px;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;

  .btn-upload,
  .btn-close {
    display: inline-block;
    vertical-align: top;
    border: 0;
    -webkit-appearance: none;
  }
  .btn-search {
    display: inline-block;
    vertical-align: top;
    border: 0;
    -webkit-appearance: none;
    margin: 0 0 0 16px;
  }
`;
