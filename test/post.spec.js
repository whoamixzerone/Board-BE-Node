const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  test('게시글 전체 조회', (done) => {
    request(app)
      .get('/')
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
      .expect('Location', '/')
      .expect(302, done);
  });
});
