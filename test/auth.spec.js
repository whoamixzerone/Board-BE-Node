const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const { sequelize, User } = require('../src/api/models');
const authService = require('../src/api/services/auth');

jest.mock('bcrypt');
jest.mock('../src/api/models/user');
jest.mock('../src/api/models/post');

let req, user;
beforeAll(async () => {
  await sequelize.sync();
  req = {
    body: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: '1234',
    },
  };
  user = {
    id: expect.anything(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: '$2b$12$CaSAx8Yi.OVonJ6Y5vy7Puk6jdTxIXaQRDYG1EIJhP1gjjRi.w3ce',
  };
});

describe('POST /auth/signup', () => {
  test('회원가입 성공', async () => {
    const userDto = { ...req.body };
    const { name, email, password } = req.body;
    const hashPasswd =
      '$2b$12$CaSAx8Yi.OVonJ6Y5vy7Puk6jdTxIXaQRDYG1EIJhP1gjjRi.w3ce';
    bcrypt.hash.mockReturnValue(hashPasswd);
    User.findOrCreate.mockReturnValue([user, true]);
    await authService.signup(userDto);

    expect(typeof authService.signup).toBe('function');
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(bcrypt.hash).toBeCalledWith(password, 12);
    expect(User.findOrCreate).toHaveBeenCalled();
    expect(User.findOrCreate).toBeCalledWith({
      where: { email },
      defaults: {
        name: name,
        email: email,
        password: hashPasswd,
      },
    });
    expect(User.findOrCreate.mock.results[1].value).toBeTruthy();
  });

  test('회원가입 실패', async () => {
    const userDto = {
      email: req.body.email,
      password: req.body.password,
    };
    const { name, email, password } = req.body;
    const hashPasswd =
      '$2b$12$CaSAx8Yi.OVonJ6Y5vy7Puk6jdTxIXaQRDYG1EIJhP1gjjRi.w3ce';
    const error = new Error('이미 사용중인 아이디입니다');
    bcrypt.hash.mockReturnValue(hashPasswd);
    User.findOrCreate.mockReturnValue([null, false]);
    const result = await authService.signup(userDto);

    expect(bcrypt.hash).toHaveBeenCalled();
    expect(bcrypt.hash).toBeCalledWith(password, 12);
    expect(User.findOrCreate).toHaveBeenCalled();
    expect(User.findOrCreate).toBeCalledWith({
      where: { email },
      defaults: {
        name: name,
        email: email,
        password: hashPasswd,
      },
    });
    expect(User.findOrCreate.mock.results[1].value).toBeFalsy();
    expect(result).toStrictEqual(error);
  });
});

describe('POST /auth/signin', () => {
  test('로그인 성공', async () => {
    const { email, password } = req.body;
    User.findOne.mockReturnValue(user);
    bcrypt.compare.mockReturnValue(true);
    const users = await authService.signin(userDto);
    const token = await tokenService.generateAuthToken(userDto);

    expect(typeof authService.signup).toBe('function');
    expect(User.findOne).toHaveBeenCalled();
    expect(User.findOne).toBeCalledWith({ where: { email } });
    expect(bcrypt.compare).toHaveBeenCalled();
    expect(bcrypt.compare).toBeCalledWith(password, user.password);
    expect(bcrypt.compare.mock.results[0].value).toBeTruthy();
    expect(users).not.toBeNull();
    expect(token).toHaveProperty('access');
  });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
});
