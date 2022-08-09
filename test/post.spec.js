const { sequelize, User, Post } = require('../src/api/models');
const postService = require('../src/api/services/post');

let req;
beforeAll(async () => {
  await sequelize.sync();
  req = {
    user: { userId: 1, name: '홍길동' },
  };
  Post.create = jest.fn();
  Post.update = jest.fn();
  Post.destroy = jest.fn();
  Post.restore = jest.fn();
});

describe('POST /posts', () => {
  test('게시글 등록', async () => {
    const data = {
      title: '게시글 제목',
      content: '게시글 내용',
      ...req.user,
    };
    const retValue = {
      dataValues: {
        views: 0,
        id: 11,
        title: 'test',
        content: 'test',
        userId: 1,
        updatedAt: '2022-08-08T08:51:04.971Z',
        createdAt: '2022-08-08T08:51:04.971Z',
      },
    };
    Post.create.mockReturnValue(retValue);
    const result = await postService.create(data);

    expect(typeof postService.create).toBe('function');
    expect(Post.create).toBeCalledTimes(1);
    expect(Post.create).toBeCalledWith(data);
    expect(result).toStrictEqual({ id: 11 });
  });
});

describe('PATCH /posts/1', () => {
  test('게시글 수정 성공', async () => {
    req = {
      params: { id: 1 },
    };
    const postDto = {
      content: '게시글 내용 수정',
      ...req.params,
      ...req.user,
    };
    const ret = [1];
    Post.update.mockReturnValue(ret);
    await postService.update(postDto);

    expect(typeof postService.update).toBe('function');
    expect(Post.update).toBeCalledTimes(1);
    expect(Post.update).toBeCalledWith(postDto, { where: { id: postDto.id } });
  });

  test('게시글 수정 실패(없는 아이디)', async () => {
    req = {
      params: { id: 100 },
    };
    const postDto = {
      content: '게시글 내용 수정',
      ...req.params,
      ...req.user,
    };
    const ret = [0];
    const error = new Error('존재하지 않는 게시글입니다');
    Post.update.mockReturnValue(ret);
    const result = await postService.update(postDto);

    expect(typeof postService.update).toBe('function');
    expect(Post.update).toBeCalledWith(postDto, { where: { id: postDto.id } });
    expect(result).toStrictEqual(error);
  });
});

describe('DELETE /posts/2', () => {
  test('게시글 삭제 성공', async () => {
    const id = 2;
    const ret = 1;
    Post.destroy.mockReturnValue(ret);
    await postService.destroy(id);

    expect(typeof postService.destroy).toBe('function');
    expect(Post.destroy).toBeCalledTimes(1);
    expect(Post.destroy).toBeCalledWith({ where: { id } });
  });

  test('게시글 삭제 실패', async () => {
    const id = 100;
    const ret = 0;
    const error = new Error('존재하지 않는 게시글입니다');
    Post.destroy.mockReturnValue(ret);
    const result = await postService.destroy(id);

    expect(Post.destroy).toBeCalledWith({ where: { id } });
    expect(result).toStrictEqual(error);
  });
});

describe('PATCH /posts/10', () => {
  test('게시글 복구 성공', async () => {
    const id = 10;
    const ret = 1;
    Post.restore.mockReturnValue(ret);
    await postService.restore(id);

    expect(typeof postService.restore).toBe('function');
    expect(Post.restore).toBeCalledTimes(1);
    expect(Post.restore).toBeCalledWith({ where: { id } });
  });

  test('게시글 복구 실패', async () => {
    const id = 100;
    const ret = 0;
    const error = new Error(
      '존재하지 않는 게시글이거나, 삭제되지 않는 게시글입니다',
    );
    Post.restore.mockReturnValue(ret);
    const result = await postService.restore(id);

    expect(result).toStrictEqual(error);
  });
});

// describe('GET /posts', () => {
//   test('게시글 전체 조회', (done) => {
//     request(app)
//       .get('/posts')
//       .expect(200)
//       .end((err, res) => {
//         if (err) throw err;

//         expect(res.body).toBeInstanceOf(Array);
//         done();
//       });
//   });
// });

// describe('GET /posts/1', () => {
//   describe('특정 게시글 조회 성공', () => {
//     beforeEach(async () => {
//       const data = [
//         {
//           id: 1,
//           title: 'test',
//           content: 'test',
//           registerId: 'xxx',
//           hits: 0,
//           registerDate: '2022-06-17',
//         },
//       ];

//       await fs.writeFile(
//         path.join(__dirname, '../simple-data.json'),
//         JSON.stringify(data),
//         'utf-8',
//       );
//     });

//     test('200 특정 게시글 반환', (done) => {
//       request(app)
//         .get('/posts/1')
//         .expect(200)
//         .end((err, res) => {
//           expect(res.body).toBeInstanceOf(Object);
//           done();
//         });
//     });
//   });

//   describe('특정 게시글 조회 실패', () => {
//     test('없는 id일 경우 404 응답', (done) => {
//       request(app).get('/posts/3').expect(404, done);
//     });
//   });
// });

afterAll(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
});
