import { Person } from '@src/models/person';
import { User } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('person functional tests', () => {
  const defaultUser = {
    userName: 'Elon Musk',
    userEmail: 'elonMusk@mail.com',
    userPassword: '1234',
  };
  let token: string;
  beforeEach(async () => {
    await Person.deleteMany();
    await User.deleteMany();
    const user = await new User(defaultUser).save();
    token = AuthService.generateToken(user.id);
  });
  describe('when creating a new person', () => {
    it('should sucessfully a create new Person', async () => {
      const newPerson = {
        personFullName: 'Elon Reeve Musk',
        personCPF: '456.734.470-78',
        personBirth: '1971-06-28',
        personPhone: '1 800 613 8840',
      };

      const expectResponse = {
        personFullName: 'Elon Reeve Musk',
        personCPF: '45673447078',
        personBirth: '1971-06-28T00:00:00.000Z',
        personPhone: '18006138840',
      };

      const response = await global.testRequest
        .post('/person')
        .set({ 'x-access-token': token })
        .send(newPerson);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(expectResponse));
    });

    it('should return 422 when there is validation error', async () => {
      const newPerson = {
        personCPF: '456.734.470-78',
        personBirth: '1971-06-28',
        personPhone: '1 800 613 8840',
      };

      const response = await global.testRequest
        .post('/person')
        .set({ 'x-access-token': token })
        .send(newPerson);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error:
          'Person validation failed: personFullName: Path `personFullName` is required.',
      });
    });

    it('should return 422 when cpf is invalid', async () => {
      const newPerson = {
        personFullName: 'Elon Reeve Musk',
        personCPF: '456.734.470-71',
        personBirth: '1971-06-28',
        personPhone: '1 800 613 8840',
      };

      const response = await global.testRequest
        .post('/person')
        .set({ 'x-access-token': token })
        .send(newPerson);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error: 'Person validation failed: personCPF: Invalid CPF',
      });
    });

    it('should return 409 when cpf already exists', async () => {
      const newPerson = {
        personFullName: 'Elon Reeve Musk',
        personCPF: '456.734.470-78',
        personBirth: '1971-06-28',
        personPhone: '1 800 613 8840',
      };

      await global.testRequest
        .post('/person')
        .set({ 'x-access-token': token })
        .send(newPerson);
      const response = await global.testRequest
        .post('/person')
        .set({ 'x-access-token': token })
        .send(newPerson);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        code: 409,
        error: expect.stringContaining(
          'personCPF: already exists in the database.'
        ),
      });
    });
  });
});
