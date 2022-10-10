import React, { FC, LegacyRef } from 'react';
import dayjs from 'dayjs';

import 'dayjs/locale/ko';
import { IChatData } from '@typings/db';
import { MonthLabel, MessageChats, DateNumber, ChatScroll } from './styles';
interface Props {
  messages: { [key: string]: IChatData[] };
  lastMessageRef: LegacyRef<HTMLDivElement> | undefined;
}
const ChatList: FC<Props> = ({ messages, lastMessageRef }) => {
  return (
    <>
      <ChatScroll>
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
                      if (message.isFile) {
                        return (
                          <MessageChats key={index} className="message-sender">
                            <div className="message">
                              <img src={message.content} />
                            </div>
                            <DateNumber>{receiverDisplay ? <span>{receiverTime}</span> : null}</DateNumber>
                          </MessageChats>
                        );
                      }
                      return (
                        <MessageChats key={index} className="message-sender">
                          <div className="message">
                            <p>{message.content}</p>
                          </div>
                          <DateNumber>{receiverDisplay ? <span>{receiverTime}</span> : null}</DateNumber>
                        </MessageChats>
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
                        <MessageChats key={index} className="message-recipient">
                          <div className="message">
                            <p>{message.content}</p>
                          </div>
                          <DateNumber>{senderDisplay ? <span>{senderTime}</span> : null}</DateNumber>
                        </MessageChats>
                      );
                    }
                  })}
                <div>
                  <MonthLabel>
                    <strong>
                      <span>{date}</span>
                    </strong>
                  </MonthLabel>
                </div>
              </section>
            );
          })}
        </div>
      </ChatScroll>

      <div ref={lastMessageRef} />
    </>
  );
};

export default ChatList;
