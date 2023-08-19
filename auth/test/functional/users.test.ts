import { User } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('users functional tests', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });
  describe('when creating a new user', () => {
    it('should sucessfully a create new user with encrypted password', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
      };

      const response = await global.testRequest.post('/user').send(newUser);
      expect(response.status).toBe(201);

      await expect(
        AuthService.comparePasswords(
          newUser.userPassword,
          response.body.userPassword
        )
      ).resolves.toBeTruthy();

      expect(response.body).toEqual(
        expect.objectContaining({
          ...newUser,
          ...{ userPassword: expect.any(String) },
        })
      );
    });

    /**
     * ajustar mais adiante para realizar o teste do login com o google
     */
    it('should sucessfully a create new user with image', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
        userImage:
          'https://lh3.googleusercontent.com/a/AATXAJx9PKJ1hc02Vq927bNpMk0UKFwkbncy_bJLvh_i=s100',
      };

      const response = await global.testRequest.post('/user').send(newUser);
      expect(response.status).toBe(201);

      await expect(
        AuthService.comparePasswords(
          newUser.userPassword,
          response.body.userPassword
        )
      ).resolves.toBeTruthy();

      expect(response.body).toEqual(
        expect.objectContaining({
          ...newUser,
          ...{ userPassword: expect.any(String) },
        })
      );
    });

    it('should return 422 when create a user with invalid image url', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
        userImage: 'invalidImage',
      };

      const response = await global.testRequest.post('/user').send(newUser);

      expect(response.status).toBe(422);

      expect(response.body).toEqual({
        code: 422,
        error: 'User validation failed: userImage: Invalid URL',
      });
    });

    it('should return 422 when there is validation error', async () => {
      const newUser = {
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
      };

      const response = await global.testRequest.post('/user').send(newUser);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error: 'User validation failed: userName: Path `userName` is required.',
      });
    });

    it('should return 409 when email already exists', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
      };
      await global.testRequest.post('/user').send(newUser);
      const response = await global.testRequest.post('/user').send(newUser);
      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        code: 409,
        error:
          'User validation failed: userEmail: already exists in the database.',
      });
    });
  });

  describe('when authenticating a user', () => {
    it('should generate a token for a valid user', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
      };
      await new User(newUser).save();
      const response = await global.testRequest
        .post('/user/authenticate')
        .send({
          userEmail: newUser.userEmail,
          userPassword: newUser.userPassword,
        });

      expect(response.body).toEqual(
        expect.objectContaining({ token: expect.any(String) })
      );
    });

    it('should return `401 - Unauthorized` if user try sign in with invalid email', async () => {
      const response = await global.testRequest
        .post('/user/authenticate')
        .send({
          userEmail: 'elonMuskJr@mail.com',
          userPassword: '1234',
        });

      expect(response.status).toBe(401);
    });

    it('should return `401 - Unauthorized` if user try sign in with invalid password', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
      };
      await new User(newUser).save();
      const response = await global.testRequest
        .post('/user/authenticate')
        .send({
          userEmail: newUser.userEmail,
          userPassword: '01234',
        });

      expect(response.status).toBe(401);
    });
  });
});
