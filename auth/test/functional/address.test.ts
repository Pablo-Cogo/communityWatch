import { Address } from '@src/models/address';
import { Person } from '@src/models/person';
import { User } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('address functional tests', () => {
  const defaultUser = {
    userName: 'Elon Musk',
    userEmail: 'elonMusk@mail.com',
    userPassword: '1234',
  };
  const defaultPerson = {
    personFullName: 'Elon Reeve Musk',
    personCPF: '45673447078',
    personBirth: '1971-06-28',
    personPhone: '18006138840',
  };
  let token: string;
  beforeEach(async () => {
    await Address.deleteMany();
    await User.deleteMany();
    await Person.deleteMany();
    const user = await new User(defaultUser).save();
    token = AuthService.generateToken(user.id);
    await new Person({ ...defaultPerson, ...{ userId: user.id } }).save();
  });
  describe('when creating a new address', () => {
    it('should sucessfully a create new Address', async () => {
      const newAddress = {
        addressState: 'SC',
        addressCity: 'Chapecó',
        addressDistrict: 'Engenho braun',
        addressStreet: 'Avenida Leopoldo Sander - E',
        addressNumber: '123D',
        addressZipCode: '89809-300',
      };

      const expectResponse = {
        addressState: 'SC',
        addressCity: 'Chapecó',
        addressDistrict: 'Engenho braun',
        addressStreet: 'Avenida Leopoldo Sander - E',
        addressNumber: '123D',
        addressZipCode: '89809300',
      };

      const response = await global.testRequest
        .post('/address')
        .set({ 'x-access-token': token })
        .send(newAddress);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(expectResponse));
    });
  });
});
