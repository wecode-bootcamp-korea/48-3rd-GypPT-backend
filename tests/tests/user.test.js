const request = require('supertest');
const { createApp } = require('../../app');
const { dataSource } = require('../../api/models/dataSource');
const { truncateTables } = require('../test-client');
const userFixture = require('../fixtures/user-fixture');
const userService = require('../../api/services/userService');

describe('Social Sign In', () => {
  let app;

  const grade1 = {
    id: 1,
    name: 'bronze',
    emoji: '🥉',
  };

  const grade2 = {
    id: 2,
    name: 'silver',
    emoji: '🥈',
  };

  const grade3 = {
    id: 3,
    name: 'gold',
    emoji: '🥇',
  };

  const member1 = {
    id: 1,
    email: 'wecode@co.kr',
    nickname: '위코드',
    gradeId: 3,
    height: 150,
    weight: 99,
    age: 33,
    gender: 'male',
  };

  const member2 = {
    id: 2,
    email: 'neecode@com',
    nickname: null,
    gradeId: 1,
    height: null,
    weight: null,
    age: 42,
    gender: 'female',
  };

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await userFixture.createMeberGrades([grade1, grade2, grade3]);
    await userFixture.createMembers([member1, member2]);
  });

  afterAll(async () => {
    const tableList = ['users', 'member_profiles', 'member_grades'];
    await truncateTables(tableList);

    await dataSource.destroy();
  });

  test('SUCCESS: FIRST KAKAO SIGN IN', async () => {
    userService.getKaKaoAccessToken = jest
      .fn()
      .mockImplementation((authCode, redirectUri) => 'kakaoMockingAccessToken');
    userService.getUserInformation = jest
      .fn()
      .mockImplementation((kakaoAccessToken) => {
        return {
          email: 'mocked@Ema.il',
          birthyear: '1993',
          birthday: '0101',
          gender: 'male',
        };
      });
    await request(app)
      .post('/user/kakao-sign-in?code=mockingAuthCode')
      .expect(202)
      .expect({
        message: 'BASIC REGISTRATION SUCCESSFUL. NEED ADDITIONAL INFORMATION',
      });
    expect(userService.getKaKaoAccessToken).toBeCalledWith(
      'mockingAuthCode',
      `${process.env.SIGN_IN_REDIRECT_URI}`
    );
    expect(userService.getUserInformation).toBeCalledWith(
      'kakaoMockingAccessToken'
    );
  });

  test('SUCCESS: BASIC INFORMATION MEMBER SIGN IN', async () => {
    userService.getKaKaoAccessToken = jest
      .fn()
      .mockImplementation((authCode, redirectUri) => 'kakaoMockingAccessToken');
    userService.getUserInformation = jest
      .fn()
      .mockImplementation((kakaoAccessToken) => {
        return {
          email: 'neecode@com',
          birthyear: '1981',
          birthday: '0101',
          gender: 'male',
        };
      });

    await request(app)
      .post('/user/kakao-sign-in?code=mockingAuthCode')
      .expect(202)
      .expect({
        message: 'NEED ADDITIONAL INFORMATION',
      });
    expect(userService.getKaKaoAccessToken).toBeCalledWith(
      'mockingAuthCode',
      `${process.env.SIGN_IN_REDIRECT_URI}`
    );
    expect(userService.getUserInformation).toBeCalledWith(
      'kakaoMockingAccessToken'
    );
  });

  test('SUCCESS: ADDITIONAL INFORMATION MEMBER SIGN IN', async () => {
    userService.getKaKaoAccessToken = jest
      .fn()
      .mockImplementation((authCode, redirectUri) => 'kakaoMockingAccessToken');
    userService.getUserInformation = jest
      .fn()
      .mockImplementation((kakaoAccessToken) => {
        return {
          email: 'wecode@co.kr',
          birthyear: '1990',
          birthday: '0101',
          gender: 'male',
        };
      });

    await request(app)
      .post('/user/kakao-sign-in?code=mockingAuthCode')
      .expect(200)
      .expect((res) => {
        const { message, authorization } = res.body;
        expect(message).toEqual('SIGN IN COMPLETED');
        expect(authorization).toMatch(/\w+/);
      });
    expect(userService.getKaKaoAccessToken).toBeCalledWith(
      'mockingAuthCode',
      `${process.env.SIGN_IN_REDIRECT_URI}`
    );
    expect(userService.getUserInformation).toBeCalledWith(
      'kakaoMockingAccessToken'
    );
  });

  test('SUCCESS: ADD ADDITIONAL INFORMATION', async () => {
    userService.getKaKaoAccessToken = jest
      .fn()
      .mockImplementation((authCode, redirectUri) => 'kakaoMockingAccessToken');
    userService.getUserInformation = jest
      .fn()
      .mockImplementation((kakaoAccessToken) => {
        return {
          email: 'neecode@com',
          birthyear: '1981',
          birthday: '0101',
          gender: 'male',
        };
      });

    await request(app)
      .post('/user/kakao-sign-up?code=mockingAuthCode')
      .send({ nickname: '니코드', height: 150, weight: 77 })
      .expect(200)
      .expect((res) => {
        const { message, authorization } = res.body;
        expect(message).toEqual('SIGN UP COMPLETED');
        expect(authorization).toMatch(/\w+/);
      });
    expect(userService.getKaKaoAccessToken).toBeCalledWith(
      'mockingAuthCode',
      `${process.env.SIGN_UP_REDIRECT_URI}`
    );
    expect(userService.getUserInformation).toBeCalledWith(
      'kakaoMockingAccessToken'
    );
  });

  test('FAIL: ADD ADDITIONAL INFORMATION', async () => {
    userService.getKaKaoAccessToken = jest
      .fn()
      .mockImplementation((authCode, redirectUri) => 'kakaoMockingAccessToken');
    userService.getUserInformation = jest
      .fn()
      .mockImplementation((kakaoAccessToken) => {
        return {
          email: 'neecode@com',
          birthyear: '1981',
          birthday: '0101',
          gender: 'male',
        };
      });

    await request(app)
      .post('/user/kakao-sign-up?code=mockingAuthCode')
      .send({ nickname: null, height: 150, weight: 77 })
      .expect(400)
      .expect({ message: 'KEY_ERROR' });
    expect(userService.getKaKaoAccessToken).toBeCalledWith(
      'mockingAuthCode',
      `${process.env.SIGN_UP_REDIRECT_URI}`
    );
    expect(userService.getUserInformation).toBeCalledWith(
      'kakaoMockingAccessToken'
    );
  });

  test('SUCCESS: CHECK DUPLICATE NICKNAME', async () => {
    await request(app)
      .post('/user/duplicate-nickname')
      .send({ nickname: '내코드' })
      .expect(200)
      .expect({ message: 'AVAILABLE NICKNAME' });
  });

  test('FAIL: CHECK DUPLICATE NICKNAME', async () => {
    await request(app)
      .post('/user/duplicate-nickname')
      .send({ nickname: '위코드' })
      .expect(409)
      .expect({ message: 'DUPLICATED NICKNAME' });
  });
});
