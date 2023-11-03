import { dbConnection } from '@src/database';
import { Occurrence } from '@src/entities/occurrence';
import { Resource } from '@src/entities/resource';
import { OccurrenceModel } from '@src/models/occurrence';
import { ResourceModel } from '@src/models/resource';

describe('occurrence tests', () => {
  beforeEach(async () => {
    const occurrenceRepository = dbConnection.getRepository(Occurrence);
    await occurrenceRepository.createQueryBuilder().delete().execute();
  });
  it('should check if create a new occurrence', async () => {
    const newOccurrence: OccurrenceModel = {
      userId: '1',
      occurrenceCobradeCode: '123',
      occurrenceDescription: 'teste',
      occurrenceStatus: 0,
      occurrenceInitialDate: new Date(),
      occurrenceFinalDate: new Date(),
    };
    const expectResponse = {
      userId: '1',
      occurrenceCobradeCode: '123',
      occurrenceDescription: 'teste',
      occurrenceStatus: 0,
    };
    const { body, status } = await global.testRequest
      .post('/occurrence')
      .send(newOccurrence);
    expect(status).toBe(201);
    expect(body).toEqual(expect.objectContaining(expectResponse));
  });
  it('should add resource in occurrence', async () => {
    const newResource: ResourceModel = {
      resourceName: 'teste',
      resourcePrice: 10.5,
      resourceQuantity: 10,
    };
    const resourceRepository = dbConnection.getRepository(Resource);
    const resource = await resourceRepository.save(newResource);

    const newOccurrence: OccurrenceModel = {
      userId: '1',
      occurrenceCobradeCode: '123',
      occurrenceDescription: 'teste',
      occurrenceStatus: 0,
      occurrenceInitialDate: new Date(),
      occurrenceFinalDate: new Date(),
      resources: [resource],
    };
    const expectResponse = {
      userId: '1',
      occurrenceCobradeCode: '123',
      occurrenceDescription: 'teste',
      occurrenceStatus: 0,
      resources: [resource],
    };
    const { body, status } = await global.testRequest
      .post('/occurrence')
      .send(newOccurrence);
    expect(status).toBe(201);
    expect(body).toEqual(expect.objectContaining(expectResponse));
  });

  it('should vinculate address to occurrence', async () => {
    const newResource: ResourceModel = {
      resourceName: 'teste',
      resourcePrice: 10.5,
      resourceQuantity: 10,
    };
    const resourceRepository = dbConnection.getRepository(Resource);
    const resource = await resourceRepository.save(newResource);

    const newOccurrence: OccurrenceModel = {
      userId: '1',
      occurrenceCobradeCode: '123',
      occurrenceDescription: 'teste',
      occurrenceStatus: 0,
      occurrenceInitialDate: new Date(),
      occurrenceFinalDate: new Date(),
      resources: [resource],
    };
    const expectResponse = {
      userId: '1',
      occurrenceCobradeCode: '123',
      occurrenceDescription: 'teste',
      occurrenceStatus: 0,
      resources: [resource],
    };
    const { body, status } = await global.testRequest
      .post('/occurrence')
      .send(newOccurrence);
    expect(status).toBe(201);
    expect(body).toEqual(expect.objectContaining(expectResponse));
  });
});
