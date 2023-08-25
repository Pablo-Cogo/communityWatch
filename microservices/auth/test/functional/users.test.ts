import { User, userRole } from '@src/models/user';
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

    it('should sucessfully when try register an admin with correct token', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
        userRole: userRole.admin,
      };
      const user = await new User(newUser).save();
      const token = AuthService.generateToken(user.id, user.userRole);

      const response = await global.testRequest
        .post('/user')
        .set({ 'x-access-token': token })
        .send({
          ...newUser,
          ...{ userEmail: 'elonMuskJr@mail.com' },
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          ...newUser,
          ...{ userEmail: 'elonMuskJr@mail.com' },
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

    it('should return `401 - Unauthorized` when try register an admin without token', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
        userRole: userRole.admin,
      };
      const response = await global.testRequest.post('/user').send(newUser);
      expect(response.status).toBe(401);
    });

    it('should return `403 - Forbiden` when try register an admin with token without permission', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
        userRole: userRole.user,
      };
      const user = await new User(newUser).save();
      const token = AuthService.generateToken(user.id, user.userRole);

      const response = await global.testRequest
        .post('/user')
        .set({ 'x-access-token': token })
        .send({
          ...newUser,
          ...{ userEmail: 'elonMuskJr@mail.com' },
          ...{ userRole: userRole.admin },
        });
      expect(response.status).toBe(403);
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

  describe('when update user', () => {
    it('should sucessfully a update role user with an admin', async () => {
      // only admin can update user
      const userLogged = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
        userRole: userRole.admin,
      };
      const user = await new User(userLogged).save();
      const token = AuthService.generateToken(user.id, user.userRole);

      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMuskJr@mail.com',
        userPassword: '1234',
      };

      const userCreated = await new User(newUser).save();

      const response = await global.testRequest
        .put('/user/role')
        .set({ 'x-access-token': token })
        .send({ _id: userCreated.id, userRole: userRole.admin });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          ...newUser,
          ...{ userPassword: expect.any(String) },
        })
      );
    });

    it('should return `401 - Unauthorized` when try update an user without token', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMuskJr@mail.com',
        userPassword: '1234',
      };
      const userCreated = await new User(newUser).save();
      const response = await global.testRequest
        .put('/user/role')
        .send({ _id: userCreated.id, userRole: userRole.admin });
      expect(response.status).toBe(401);
    });

    it('should return `403 - Forbiden` when try update an user with invalid token', async () => {
      const newUser = {
        userName: 'Elon Musk',
        userEmail: 'elonMuskJr@mail.com',
        userPassword: '1234',
      };
      const userCreated = await new User(newUser).save();
      const token = AuthService.generateToken(
        userCreated.id,
        userCreated.userRole
      );
      const response = await global.testRequest
        .put('/user/role')
        .set({ 'x-access-token': token })
        .send({ _id: userCreated.id, userRole: userRole.admin });
      expect(response.status).toBe(403);
    });
  });
});
