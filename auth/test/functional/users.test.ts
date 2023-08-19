import { User } from '@src/models/user';
import { AuthService } from '@src/services/auth';

describe('users functional tests', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });
  describe('when creating a new user', () => {
    it('should sucessfully a create new user with encrypted password', async () => {
      const newUser: User = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
      };

      const response = await global.testRequest.post('/users').send(newUser);
      expect(response.status).toBe(201);

      await expect(
        AuthService.comparePassword(
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

    it('should return 422 when there is validation error', async () => {
      const newUser = {
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
      };

      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error: 'User validation failed: userName: Path `userName` is required.',
      });
    });

    it('should return 409 when email already exists', async () => {
      const newUser: User = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
      };
      await global.testRequest.post('/users').send(newUser);
      const response = await global.testRequest.post('/users').send(newUser);
      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        code: 409,
        error:
          'User validation failed: userEmail: already exists in the database.',
      });
    });
  });
});
