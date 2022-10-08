export interface IUser {
    id: number
    nickname: string
    email: string
    Workspaces: IWorkspace[]
}

export interface IUserWithOnline extends IUser {
    online: boolean
}

export interface IChat {
    id: number
    imageUrls: string
    content: string
    SenderId: string // 비공개 채널 여부, 강좌에서는 모두 false(공개)
    Sender: string
    createdAt: Date
    unreadChat: number
}

export interface IChatData {
    id: number
    content: string
    name: string
    createdAt: string
}

export interface IRoom {
    id: number
    content: string
    createdAt: string
}
export interface IDM {
    // DM 채팅
    id: number
    SenderId: number // 보낸 사람 아이디
    Sender: IUser
    ReceiverId: number // 받는 사람 아이디
    Receiver: IUser
    content: string
    createdAt: Date
}

export interface IWorkspace {
    id: number
    name: string
    url: string // 주소 창에 보이는 주소
    OwnerId: number // 워크스페이스 만든 사람 아이디
}
