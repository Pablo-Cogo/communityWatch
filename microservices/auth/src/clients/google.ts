import config, { IConfig } from 'config';
import { OAuth2Client, Credentials } from 'google-auth-library';
import * as HTTPUtil from '@src/util/request';

const googleConfig: IConfig = config.get('App.google');

export interface ResponseGoogleProps {
  sub: string;
  picture: string;
  email: string;
  email_verified: boolean;
  hd?: string;
}

export class GoogleAuth {
  private readonly authClient: OAuth2Client;
  private readonly scopes: string[];

  constructor(protected request = new HTTPUtil.Request()) {
    this.scopes = ['https://www.googleapis.com/auth/userinfo.email'];
    this.authClient = new OAuth2Client({
      clientId: googleConfig.get('clientId'),
      clientSecret: googleConfig.get('clientSecret'),
      redirectUri: googleConfig.get('redirectUri'),
    });
  }

  public async generateAuthUrl(): Promise<string> {
    const authUrl = this.authClient.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
    });
    console.log(authUrl);
    return authUrl;
  }

  public async getToken(code: string): Promise<Credentials> {
    const { tokens } = await this.authClient.getToken(code);
    return tokens;
  }

  public async getUserData(access_token: string | null | undefined) {
    const response = await this.request.get<ResponseGoogleProps>(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    return response.data;
  }
}
