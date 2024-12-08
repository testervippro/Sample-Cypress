
import { ClientSecretCredential } from "@azure/identity";
import { Client, AuthenticationProvider} from '@microsoft/microsoft-graph-client';
import 'dotenv/config'

export class CustomAuthProvider implements AuthenticationProvider {
  private credential: ClientSecretCredential;

  constructor() {
    this.credential = new ClientSecretCredential(
      process.env.TENANT_ID,
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET!
    );
  }

  async getAccessToken(): Promise<string> {
  //
  // Use /.default to request all permissions granted to the app

  const scope = 'https://graph.microsoft.com/.default';

  const tokenResponse = await this.credential.getToken(scope);
    if (!tokenResponse || !tokenResponse.token) {
      throw new Error('Could not obtain access token');
    }
    return tokenResponse.token;
  }
}
export const authProvider = new CustomAuthProvider();
export const token =  new CustomAuthProvider().getAccessToken();

export const userClient = Client.initWithMiddleware({ authProvider });
