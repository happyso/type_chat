import React, { FC, LegacyRef, ReactFragment } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface Props {
  messages: { [key: string]: any };
  typingStatus: ReactFragment;
  lastMessageRef: LegacyRef<HTMLDivElement> | undefined;
}
const ChatList: FC<Props> = ({ messages, typingStatus, lastMessageRef }) => {
  return (
    <>
      {Object.entries(messages).map(([date, chats]) => {
        return (
          <section className={`section-${date}`} key={date}>
            <div>
              <button>{date}</button>
            </div>
            {chats &&
              chats.map((message: any, index: number) =>
                message.name === localStorage.getItem('userName') ? (
                  <div className="message__chats" key={index}>
                    <p className="sender__name">You</p>
                    <div className="message__sender">
                      <p>{message.content}</p>
                    </div>
                    <span>{dayjs(message.createdAt).format('h:mm A')}</span>
                  </div>
                ) : (
                  <div className="message__chats" key={index}>
                    <p>{message.name}</p>
                    <div className="message__recipient">
                      <p>{message.content}</p>
                    </div>
                    <span>{dayjs(message.createdAt).format('h:mm A')}</span>
                  </div>
                ),
              )}
          </section>
        );
      })}

      <div className="message__status">
        <p>{typingStatus}</p>
      </div>
      <div ref={lastMessageRef} />
    </>
  );
};

export default ChatList;
