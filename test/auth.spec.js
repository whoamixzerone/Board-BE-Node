require('dotenv').config();
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const { sequelize, User } = require('../src/api/models');
const userService = require('../src/api/services/user');
const authService = require('../src/api/services/auth');
const bcryptUtils = require('../src/api/utils/bcrypt');
const tokenUtils = require('../src/api/utils/token');

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
    let userDto = { ...req.body };
    const { name, email, password } = req.body;
    const hashPasswd =
      '$2b$12$CaSAx8Yi.OVonJ6Y5vy7Puk6jdTxIXaQRDYG1EIJhP1gjjRi.w3ce';
    userDto.password = hashPasswd;
    bcrypt.hash.mockReturnValue(hashPasswd);
    User.findOrCreate.mockReturnValue([user, true]);
    await bcryptUtils.passwordToHash(password);
    await userService.findOrCreateUser(userDto);

    expect(typeof bcryptUtils.passwordToHash).toBe('function');
    expect(typeof userService.findOrCreateUser).toBe('function');
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(bcrypt.hash).toBeCalledWith(password, 12);
    expect(User.findOrCreate).toHaveBeenCalled();
    expect(User.findOrCreate).toBeCalledWith({
      where: { email },
      defaults: {
        name,
        email,
        password: hashPasswd,
      },
    });
    expect(User.findOrCreate.mock.results[0].value[1]).toBeTruthy();
  });

  test('회원가입 실패', async () => {
    bcrypt.hash.mockClear();
    User.findOrCreate.mockClear();

    const userDto = { ...req.body };
    const { name, email, password } = req.body;
    const hashPasswd =
      '$2b$12$CaSAx8Yi.OVonJ6Y5vy7Puk6jdTxIXaQRDYG1EIJhP1gjjRi.w3ce';
    userDto.password = hashPasswd;
    const error = new Error('이미 사용중인 아이디입니다');
    bcrypt.hash.mockReturnValue(hashPasswd);
    User.findOrCreate.mockReturnValue([user, false]);
    await bcryptUtils.passwordToHash(password);
    const result = await userService.findOrCreateUser(userDto);

    expect(bcrypt.hash).toHaveBeenCalled();
    expect(bcrypt.hash).toBeCalledWith(password, 12);
    expect(User.findOrCreate).toHaveBeenCalled();
    expect(User.findOrCreate).toBeCalledWith({
      where: { email },
      defaults: {
        name,
        email,
        password: hashPasswd,
      },
    });
    expect(User.findOrCreate.mock.results[0].value[1]).toBeFalsy();
    expect(result).toStrictEqual(error);
  });
});

describe('POST /auth/signin', () => {
  test('로그인 성공', async () => {
    const userDto = { ...req.body };
    const { email, password } = req.body;
    User.findByPk.mockReturnValue(user);
    bcrypt.compare.mockReturnValue(true);
    const result = await userService.findByEmail(email);
    await bcryptUtils.isComparePassword(user, password);
    const token = await tokenUtils.generateAuthToken(userDto);

    expect(typeof userService.findByEmail).toBe('function');
    expect(typeof tokenUtils.generateAuthToken).toBe('function');
    expect(User.findOne).toHaveBeenCalled();
    expect(User.findOne).toBeCalledWith({ where: { email } });
    expect(bcrypt.compare).toHaveBeenCalled();
    expect(bcrypt.compare).toBeCalledWith(password, user.password);
    expect(bcrypt.compare.mock.results[0].value).toBeTruthy();
    expect(result).not.toBeNull();
    expect(token).toHaveProperty('access_token');
  });

  test('로그인 실패 - 틀린 아이디, 비밀번호', async () => {
    User.findOne.mockClear();
    bcrypt.compare.mockClear();

    const error = new Error('아이디 혹은 비밀번호를 확인해주세요');
    const { email, password } = req.body;
    User.findOne.mockReturnValue(null);
    const result = await userService.findByEmail(email);

    expect(User.findOne).toHaveBeenCalled();
    expect(User.findOne).toBeCalledWith({ where: { email } });
    expect(User.findOne.mock.results[0].value).toBeNull();
    expect(result).toStrictEqual(error);
  });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
});
