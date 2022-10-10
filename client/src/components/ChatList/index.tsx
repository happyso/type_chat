import React, { FC, LegacyRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { IChatData } from '@typings/db';

interface Props {
  messages: { [key: string]: IChatData[] };
  lastMessageRef: LegacyRef<HTMLDivElement> | undefined;
}
const ChatList: FC<Props> = ({ messages, lastMessageRef }) => {
  return (
    <>
      <div className="chatScroll">
        <div className="inner">
          {Object.entries(messages).map(([date, chats]) => {
            let senderDisplay = true;
            let receiverDisplay = true;
            let senderTime = '';
            let receiverTime = '';
            return (
              <section className={`section-${date}`} key={date}>
                {chats &&
                  chats.map((message: any, index: number) => {
                    const itemTime = dayjs(message.createdAt).format('A hh:mm');
                    if (message.name === localStorage.getItem('userName')) {
                      if (receiverTime) {
                        if (receiverTime !== itemTime) {
                          receiverTime = itemTime;
                          receiverDisplay = true;
                        } else {
                          receiverDisplay = false;
                        }
                      } else {
                        receiverTime = itemTime;
                      }
                      return (
                        <div className="message__chats" key={index}>
                          <div className="message__sender">
                            <p>{message.content}</p>
                          </div>
                          <span>{receiverDisplay ? <span>{receiverTime}</span> : null}</span>
                        </div>
                      );
                    } else {
                      if (senderTime) {
                        if (senderTime !== itemTime) {
                          senderTime = itemTime;
                          senderDisplay = true;
                        } else {
                          senderDisplay = false;
                        }
                      } else {
                        senderTime = itemTime;
                      }
                      return (
                        <div className="message__chats" key={index}>
                          <div className="message__recipient">
                            <p>{message.content}</p>
                          </div>
                          <span>{senderDisplay ? <span>{senderTime}</span> : null}</span>
                        </div>
                      );
                    }
                  })}
                <div>
                  <button>{date}</button>
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <div ref={lastMessageRef} />
    </>
  );
};

export default ChatList;
