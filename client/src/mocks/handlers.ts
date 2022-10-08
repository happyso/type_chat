import { rest } from 'msw';

export const handlers = [
  rest.post('/api/room/msjang/chat', async (req, res, ctx) => {
    sessionStorage.setItem('chat', new Date().getTime().toString());
    return res(
      // 상태 코드 200을 응답한다.
      ctx.status(200),
    );
  }),

  rest.get('/api/assets/image', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          imageUrls: `${process.env.PUBLIC_URL}/img-profile-1.png`,
        },
        {
          id: 2,
          imageUrls: `${process.env.PUBLIC_URL}/img-profile-3.png`,
        },
      ]),
    );
  }),

  //get uset chat list
  rest.get('/api/soyoung/list', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          imageUrls: `${process.env.PUBLIC_URL}/img-profile-1.png`,
          content: '어딘데 출근 안하니, 죽고싶니?',
          SenderId: 'msjang',
          Sender: '장만월 사장님',
          createdAt: 'Sun Oct 01 2022 20:12:13 GMT+0900 (한국 표준시)',
          unreadChat: 2,
        },
        {
          id: 2,
          imageUrls: `${process.env.PUBLIC_URL}/img-profile-3.png`,
          content: '오시는 길에 와인 몇병만 사다주세요.',
          SenderId: 'mrshin',
          Sender: '신정근 바텐더',
          createdAt: 'Sun Oct 02 2022 20:12:13 GMT+0900 (한국 표준시)',
          unreadChat: null,
        },
      ]),
    );
  }),

  rest.get('/api/users/msjang', async (req, res, ctx) => {
    return res(
      ctx.json({
        nickname: '장만월 사장님',
      }),
    );
  }),

  rest.get('/api/users/mrshin', async (req, res, ctx) => {
    return res(
      ctx.json({
        nickname: '신정근 바텐더',
      }),
    );
  }),

  rest.get('/api/room/msjang', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          content: '출근했니?',
          name: 'msjang',
          createdAt: 'Thu May 01 2020 09:00:00 GMT+0900 (한국 표준시)',
        },
        {
          id: 2,
          content: '출근했냐구?',
          name: 'msjang',
          createdAt: 'Thu May 01 2020 09:00:00 GMT+0900 (한국 표준시)',
        },
        {
          id: 3,
          content: '어딘데 출근 안하니?',
          name: 'msjang',
          createdAt: 'Thu May 07 2020 09:00:00 GMT+0900 (한국 표준시)',
        },
        {
          id: 4,
          content: '어딘데 출근 안하니, 죽고싶니?',
          name: 'msjang',
          createdAt: 'Thu May 07 2020 12:00:00 GMT+0900 (한국 표준시)',
        },
        {
          id: 5,
          content: '해외 출장중입니다.',
          name: 'soyoung',
          createdAt: 'Thu May 07 2020 12:00:00 GMT+0900 (한국 표준시)',
        },
      ]),
    );
  }),

  rest.get('/api/room/mrshin', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          content: '외출하셨나요?',
          createdAt: 'Sun Oct 02 2022 20:12:13 GMT+0900 (한국 표준시)',
        },
        {
          id: 2,
          content: '오시는 길에 와인 몇병만 사다주세요.',
          createdAt: 'Sun Oct 02 2022 20:12:13 GMT+0900 (한국 표준시)',
        },
      ]),
    );
  }),

  // 추가
  rest.post('/api/room/:room_id', async (req, res, ctx) => {
    const { username } = await req.json();
    return res(
      ctx.json({
        username,
        firstName: 'John',
      }),
    );
  }),
];
