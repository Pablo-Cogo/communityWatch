import { GoogleAuth } from '@src/clients/google';

export default class GoogleAuthService {
  private static readonly googleAuth: GoogleAuth = new GoogleAuth();

  public static async getAuthUrl(): Promise<string> {
    try {
      const authUrl = await this.googleAuth.generateAuthUrl();
      return authUrl;
    } catch (error) {
      throw new Error('Failed to generate Google authentication URL.');
    }
  }

  public static async getAccessToken(
    authorizationCode: string
  ): Promise<string | null | undefined> {
    try {
      const tokens = await this.googleAuth.getToken(authorizationCode);
      return tokens.access_token;
    } catch (error) {
      throw new Error('Failed to obtain access token from Google.');
    }
  }

  public static async getUserData(access_token: string | null | undefined) {
    try {
      return this.googleAuth.getUserData(access_token);
    } catch (error) {
      throw new Error('Failed to obtain access token from Google.');
    }
  }
}
