const request = require('supertest');
const path = require('path');
const fs = require('fs').promises;
const app = require('../src/loaders/app');

const { sequelize, User, Post } = require('../src/api/models');

beforeAll(async () => {
  await sequelize.sync();
});

describe('GET /posts', () => {
  test('게시글 전체 조회', (done) => {
    request(app)
      .get('/posts')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        expect(res.body).toBeInstanceOf(Array);
        done();
      });
  });
});

describe('POST /posts', () => {
  test('게시글 등록', (done) => {
    request(app)
      .post('/posts')
      .send({
        title: 'test1',
        content: 'test1',
      })
      .expect('Location', '/posts')
      .expect(302, done);
  });
});

describe('PATCH /posts/1', () => {
  describe('게시글 수정 성공', () => {
    test('302 /posts 리다이렉션', (done) => {
      request(app)
        .patch('/posts/1')
        .send({
          title: '게시글 수정 test',
          content: '게시글 content test',
        })
        .expect('Location', '/posts')
        .expect(302, done);
    });
  });

  describe('게시글 수정 실패', () => {
    test('없는 id일 경우 404 응답', (done) => {
      request(app).patch('/posts/3').expect(404, done);
    });
  });
});

describe('DELETE /posts/1', () => {
  describe('게시글 삭제 성공', () => {
    test('302 /posts 리다이렉션', (done) => {
      request(app)
        .delete('/posts/1')
        .expect('Location', '/posts')
        .expect(302, done);
    });
  });

  describe('게시글 삭제 실패', () => {
    test('없는 id일 경우 404 응답', (done) => {
      request(app).delete('/posts/3').expect(404, done);
    });
  });
});

describe('GET /posts/1', () => {
  describe('특정 게시글 조회 성공', () => {
    beforeEach(async () => {
      const data = [
        {
          id: 1,
          title: 'test',
          content: 'test',
          registerId: 'xxx',
          hits: 0,
          registerDate: '2022-06-17',
        },
      ];

      await fs.writeFile(
        path.join(__dirname, '../simple-data.json'),
        JSON.stringify(data),
        'utf-8',
      );
    });

    test('200 특정 게시글 반환', (done) => {
      request(app)
        .get('/posts/1')
        .expect(200)
        .end((err, res) => {
          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });
  });

  describe('특정 게시글 조회 실패', () => {
    test('없는 id일 경우 404 응답', (done) => {
      request(app).get('/posts/3').expect(404, done);
    });
  });
});

afterAll(async () => {
  const data = [
    {
      id: 1,
      title: 'test',
      content: 'test',
      registerId: 'xxx',
      hits: 0,
      registerDate: '2022-06-17',
    },
  ];

  await fs.unlink(path.join(__dirname, '../simple-data.json'));

  await fs.writeFile(
    path.join(__dirname, '../simple-data.json'),
    JSON.stringify(data),
    'utf-8',
  );

  await sequelize.sync({ force: true });
  await sequelize.close();
});
