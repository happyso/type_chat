export interface IChat {
  id: number;
  imageUrls: string;
  content: string;
  SenderId: string; // 비공개 채널 여부, 강좌에서는 모두 false(공개)
  Sender: string;
  createdAt: Date;
  unreadChat: number;
}

export interface IChatData {
  id: number;
  content: string;
  name: string;
  createdAt: string;
  isFile: boolean;
}

export interface IImageData {
  id: number;
  imageUrls: string;
}

export interface IChatList {
  id: number;
  imageUrls: string;
  content: string;
  SenderId: string;
  Sender: string;
  createdAt: string;
  unreadChat: number;
}
