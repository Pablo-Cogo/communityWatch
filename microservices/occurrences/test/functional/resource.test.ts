import { dbConnection } from '@src/database';
import { Resource } from '@src/entities/resource';
import { ResourceModel } from '@src/models/resource';

describe('occurrence tests', () => {
  beforeEach(async () => {
    const resourceRepository = dbConnection.getRepository(Resource);
    await resourceRepository.createQueryBuilder().delete().execute();
  });
  it('should check if create a new occurrence', async () => {
    const newResource: ResourceModel = {
      resourceName: 'teste',
      resourcePrice: 10.5,
      resourceQuantity: 10,
    };
    const expectResponse = {
      resourceName: 'teste',
      resourcePrice: 10.5,
      resourceQuantity: 10,
      resourceReserved: 0,
    };
    const { body, status } = await global.testRequest
      .post('/resource')
      .send(newResource);
    expect(status).toBe(201);
    expect(body).toEqual(expect.objectContaining(expectResponse));
  });
});
