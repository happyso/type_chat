import { IChatData } from '@typings/db';
import dayjs from 'dayjs';
dayjs.locale('ko');
export default function makeSection<T extends IChatData>(chatList: T[]) {
  const sections: { [key: string]: T[] } = {};
  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format('YYYY MMMM D일');
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
}
