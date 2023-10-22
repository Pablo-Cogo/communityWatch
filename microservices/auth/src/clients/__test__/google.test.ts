import { OAuth2Client, Credentials } from 'google-auth-library';
import { GoogleAuth } from '../google';

jest.mock('google-auth-library');

describe('GoogleAuth client', () => {
  const mockGenerateAuthUrl = jest.fn();
  const mockGetToken = jest.fn();

  const mockOAuth2Client = {
    generateAuthUrl: mockGenerateAuthUrl,
    getToken: mockGetToken,
  } as unknown as OAuth2Client;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate an authentication URL', async () => {
    mockGenerateAuthUrl.mockReturnValue('https://example.com/auth-url');
    (OAuth2Client as jest.MockedClass<typeof OAuth2Client>).mockImplementation(
      () => mockOAuth2Client
    );

    const authClient = new GoogleAuth();
    const authUrl = await authClient.generateAuthUrl(null);

    expect(mockGenerateAuthUrl).toHaveBeenCalledWith({
      access_type: 'offline',
      scope: authClient['scopes'],
    });
    expect(authUrl).toBe('https://example.com/auth-url');
  });

  it('should get access tokens using the authorization code', async () => {
    const tokensResponse = {
      access_token: 'ACCESS_TOKEN',
      refresh_token: 'REFRESH_TOKEN',
      scope: 'https://www.googleapis.com/auth/userinfo.email',
      token_type: 'Bearer',
      expiry_date: 1234567890,
    } as Credentials;

    mockGetToken.mockResolvedValue({ tokens: tokensResponse });
    (OAuth2Client as jest.MockedClass<typeof OAuth2Client>).mockImplementation(
      () => mockOAuth2Client
    );

    const authClient = new GoogleAuth();
    const code = 'AUTHORIZATION_CODE';
    const tokens = await authClient.getToken(code);

    expect(mockGetToken).toHaveBeenCalledWith(code);
    expect(tokens).toEqual(tokensResponse);
  });
});
