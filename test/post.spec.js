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
  Post.findByPk = jest.fn();
  Post.findAll = jest.fn();
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

describe('GET /posts/1', () => {
  test('특정 게시글 조회 성공', async () => {
    const id = 1;
    const views = 1;
    const retValue = {
      id: 1,
      title: 'test',
      content: 'test',
      views: 1,
      updatedAt: '2022-08-08T08:51:04.971Z',
      createdAt: '2022-08-08T08:51:04.971Z',
      User: {
        name: '홍길동',
      },
    };

    Post.update = jest.fn();
    Post.findByPk = jest
      .fn()
      .mockReturnValueOnce({
        id: 1,
        title: 'test',
        content: 'test',
        views: 0,
        userId: 1,
        updatedAt: '2022-08-08T08:51:04.971Z',
        createdAt: '2022-08-08T08:51:04.971Z',
        getDataValue: jest.fn(() => 0),
      })
      .mockReturnValueOnce(retValue);
    Post.update.mockReturnValue([1]);
    const result = await postService.updateAndFindId(id);

    expect(typeof postService.updateAndFindId).toBe('function');
    expect(Post.update).toHaveBeenCalled();
    expect(Post.findByPk).toBeCalledTimes(2);
    expect(Post.update).toBeCalledWith({ views }, { where: { id } });
    expect(Post.findByPk).toBeCalledWith(id, {
      attributes: { exclude: ['deletedAt', 'userId'] },
      include: {
        model: User,
        attributes: ['name'],
      },
    });
    expect(result).toStrictEqual(retValue);
  });

  test('없는 id(100)일 경우 Error', async () => {
    const id = 100;
    const error = new Error('존재하지 않는 게시글입니다');
    Post.findByPk.mockReturnValue(null);
    const result = await postService.updateAndFindId(id);

    expect(Post.findByPk).toBeCalledWith(id);
    expect(result).toStrictEqual(error);
  });
});

describe('GET /posts', () => {
  test('게시글 전체 조회', async () => {
    const ret = {
      dataValues: [
        {
          views: 1,
          id: 1,
          title: 'test',
          content: 'test',
          userId: 1,
          updatedAt: '2022-08-08T08:51:04.971Z',
          createdAt: '2022-08-08T08:51:04.971Z',
        },
        {
          views: 0,
          id: 2,
          title: 'test2',
          content: 'test2',
          userId: 1,
          updatedAt: '2022-08-08T08:51:04.971Z',
          createdAt: '2022-08-08T08:51:04.971Z',
        },
      ],
    };
    Post.findAll.mockReturnValue(ret);
    const result = await postService.getList();

    expect(typeof postService.getList).toBe('function');
    expect(Post.findAll).toHaveBeenCalled();
    expect(result).toStrictEqual(ret);
  });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
});
