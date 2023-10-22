describe('occurrence tests', () => {
  it('should check if return an user valid', async () => {
    const { body, status } = await global.testRequest.get('/occurrence');
    expect(status).toBe(200);
    expect(body).toEqual(['teste']);
  });
});
