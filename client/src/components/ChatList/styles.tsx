import styled from '@emotion/styled';
export const ChatScroll = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  height: 100%;
  max-height: 100%;
  .inner {
    display: flex;
    flex-direction: column-reverse;
    height: auto;
    max-height: 100%;
    overflow-y: scroll;
  }
`;
export const MonthLabel = styled.div`
  margin: 0 16px 0;
  position: relative;
  text-align: center;

  strong {
    display: inline-block;
    padding: 0 12px;
    background-color: var(--pale-grey);
    position: relative;

    span {
      font-size: 12px;
      letter-spacing: normal;
      color: var(--charcoal-grey-two);
      opacity: 0.4;
    }
  }
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 7px;
    background-color: var(--pale-lilac);
    height: 1px;
  }
`;

export const MessageChats = styled.div`
  margin: 10px 16px 0;
  position: relative;
  text-align: center;
  display: flex;
  align-items: flex-end;

  &.message-recipient {
    margin-right: auto;
    .message {
      background-color: #fff;
      color: var(--charcoal-grey-two);
      box-shadow: 0 2px 4px 0 var(--black-10);
    }
  }

  &.message-sender {
    margin-left: auto;
    flex-direction: row-reverse;
    .message {
      background-color: var(--point-color);
      color: #fff;
      box-shadow: 0 2px 4px 0 rgba(91, 56, 177, 0.4);
    }
  }
  .message {
    display: inline-block;
    padding: 12px;
    border-radius: 12px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.1px;
  }
`;

export const DateNumber = styled.div`
  display: inline-block;
  margin: 0 5px;
  opacity: 0.4;
  font-size: 12px;
  line-height: 1.5;
  color: var(--charcoal-grey-two);
`;
