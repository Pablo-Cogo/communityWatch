import { User } from '@src/models/user';

describe('users functional tests', () => {
  describe('when creating a new user', () => {
    it('should sucessfully a create new user', async () => {
      const newUser: User = {
        userName: 'Elon Musk',
        userEmail: 'elonMusk@mail.com',
        userPassword: '1234',
      };

      const response = await global.testRequest.post('/users').send(newUser);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newUser));
    });
  });
});
