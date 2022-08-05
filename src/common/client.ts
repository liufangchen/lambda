import { Lambda } from "@aws-sdk/client-lambda";

export default class Client extends Lambda {

  public static REGION = 'default';

  public static CREDENTIALS;

  constructor() {
    super({
      region: Client.REGION,
      credentials: {
        accessKeyId: Client.CREDENTIALS.AccessKeyID,
        secretAccessKey: Client.CREDENTIALS.SecretAccessKey,
      },
    })
  }
}