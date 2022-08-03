import { Lambda } from "@aws-sdk/client-lambda";

export default class Client extends Lambda {

    static REGION = 'default';

    static CREDENTIALS;

    private static instance: Client;

    public static getInstance(): Client {
      if (!Client.instance) {
        Client.instance = new Client({
          region: Client.REGION,
          credentials: {
            accessKeyId: Client.CREDENTIALS.AccessKeyID,
            secretAccessKey: Client.CREDENTIALS.SecretAccessKey,
          },
        });
      }
      return Client.instance;
    }
}