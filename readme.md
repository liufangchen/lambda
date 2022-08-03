## Lambda Component

Lambda component is a [Serverless Devs](https://docs.serverless-devs.com/en) for Lambda. It helps you more easily manage all the resources of lambda and quickly start a serverless application based on lambda.
> The [Wiki](https://github.com/liufangchen/lambda/wiki) is the documentation source

## Features

- **Full lifecycle management**: manages a project during its lifecycle, including creation, development, debugging, deployment, and O&M.
- **Security release**: automatically detects the changes in functions.
- **Quick integration**: integrates with common CI/CD tools. For more information, see [CI/CD tools](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/en/cicd.md).
- **Observability**: allows you to query metrics and logs on your client. For more information, see [Query metrics](en/command/metrics.md) and [Query logs](en/command/logs.md).
- **Multi-mode debugging**: supports multi-mode debugging to meet different debugging requirements in the development state and O&M state. The modes include [local call](en/command/local.md), [remote debugging](en/command/invoke.md), and [cloud-terminal joint debugging](en/command/proxied.md).

## Quickstart
- Prerequisites
    - [Serverless Devs](https://docs.serverless-devs.com/serverless-devs/install)
    - [AWS Account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account)
    - [AWS Credentials](https://console.aws.amazon.com/iam/)
- Execute the `s` command:
    ```shell script
    $ s
    ? Serverless Devs project is not detected. Do you want to create a new project? (Y/n) 
    ```  
- Fill in `y` and press Enter to enter the creation guide section:
    ```shell script
    🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome
    
    ? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
    ❯ Alibaba Cloud Serverless 
      AWS Cloud Serverless 
      Baidu Cloud Serverless 
      Huawei Cloud Serverless 
      Tencent Cloud Serverless 
      Dev Template for Serverless Devs 
    ```

- At the same time, you only need to select the corresponding option and follow the instructions. For example, if you select `Aws Cloud Serverless`, you can see the classification of application templates under AWS Serverless products:

    ```shell script
    ? Please select an Serverless-Devs Application (Use arrow keys or type to search)
    ❯ TODO
    ```

- At this time, you can continue to select specific applications under a certain category for initialization. For example, after selecting `lambda-runtime-starter`, you can see the specific template applications under that category:

    ```shell script
    ? Please select an templete (Use arrow keys or type to search)
    ❯ TODO
    ```

- Select `lambda-http-nodejs` to complete the creation. During the boot process, the process of filling in the project name and selecting the key may appear:
    - The project name can be: `start-lambda-http-nodejs12`
    - The key can be the one we created above: `aws-access`

- Deploy Function to Lambda
    ```shell script
    $ s deploy
    TODO
    ```  
## Contributing

See the [Wiki](https://github.com/liufangchen/lambda/wiki/Contributing)
