import styled from '@emotion/styled';

export const ChatFooter = styled.div`
  background-color: var(--pale-grey);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 16px 20px;
  input {
    font-size: 14px;
    border: 0;
    border-radius: 25px;
    box-shadow: 0 2px 4px 0 var(--black-10);
    background-color: #fff;
    padding: 14px 16px 15px;
    line-height: 1.5;
    flex: 1;
  }
  .btn-send {
    margin: 0 0 0 12px;
  }
`;

/*
.chat-footer {
  padding: 10px;
  background-color: #f9f5eb;
  display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
 */
