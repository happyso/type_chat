import styled from '@emotion/styled';

export const Header = styled.div`
  padding: 10px 12px;
  background-color: var(--point-color);
  text-align: center;
  h1 {
    font-size: 17px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.12px;
    text-align: center;
    color: #fff;
    line-height: 24px;
  }
  .btn-menu {
    display: inline-block;
    vertical-align: top;
    border: 0;
    -webkit-appearance: none;

    position: absolute;
    left: 12px;
    top: 10px;
  }

  .btn-mypage {
    position: absolute;
    right: 12px;
    top: 10px;
  }

  .btn-back {
    display: inline-block;
    vertical-align: top;
    border: 0;
    -webkit-appearance: none;

    position: absolute;
    left: 12px;
    top: 10px;
  }

  input[type='file'] {
    display: none;
  }
`;

export const RoomList = styled.div`
  padding: 10px 0 0;
  font-size: 13px;
  color: var(--cool-grey);

  a {
    display: flex;
    padding: 9px 16px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .chat-img {
    display: block;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .chat-desc {
    flex: 1;
    margin: 0 0 0 15px;
    position: relative;

    strong {
      display: block;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: -0.2px;
      color: var(--charcoal-grey);
      margin: 0 0 3px;
    }

    .date {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 11px;
      letter-spacing: normal;
      text-align: right;
      color: var(--charcoal-grey-two);
      opacity: 0.4;
    }
    .unreadCount {
      position: absolute;
      right: 0;
      bottom: 0;
      display: inline-block;
      background-color: var(--point-color);
      text-align: center;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 10px;
      font-weight: bold;
      letter-spacing: -0.08px;
      text-align: center;
      color: #fff;
      line-height: 18px;
    }
  }
`;
