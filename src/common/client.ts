import { Lambda } from "@aws-sdk/client-lambda";
import { IAM } from "@aws-sdk/client-iam";

export default class Client{

  public static REGION = 'default';

  public static CREDENTIALS: { AccessKeyID: any; SecretAccessKey: any; };

  public static lambda ():Lambda {
    const lambda = new Lambda({
      region: Client.REGION,
      credentials: {
        accessKeyId: Client.CREDENTIALS.AccessKeyID,
        secretAccessKey: Client.CREDENTIALS.SecretAccessKey,
      }
    });
    return lambda;
  }

  public static iam () {
    const iam = new IAM({
      region: Client.REGION,
      credentials: {
        accessKeyId: Client.CREDENTIALS.AccessKeyID,
        secretAccessKey: Client.CREDENTIALS.SecretAccessKey,
      }
    });
    return iam;
  }
}