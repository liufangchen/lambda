import logger from '../common/logger';
import { zip } from '@serverless-devs/core';
import Client from '../common/client';
import { FunctionCode } from '@aws-sdk/client-lambda';
import fs from 'fs';
import { randomInt } from 'crypto';

export default class Function {

  async deploy(props) {
    let { Code, Role, FunctionName } = props;
    // 1. validate - Role（auto）
    // try get role : const { Role } = await Client.iam().getRole();
    if (!Role) {
      logger.warn(`Role isn't specified, auto created for you.`);
      const roleName = `s-${FunctionName}-${randomInt(999999)}`;
      logger.log(`Start generating roleName: ${roleName}`);
      let { Role } = await Client.iam().createRole({
        AssumeRolePolicyDocument: trustPolicyDocument,
        RoleName: roleName,
        Description: "LambdaFunction",
      });
      props.Role = Role.Arn;
    }
    // 2. checkFunctionExist
    // 3. checkImage
    // 4. package code if PackageType is zip, not image
    await zip({ codeUri: Code, outputFilePath: "./.s/lambda", outputFileName: "Function.zip" }).finally(() => {
      let ZipFile = fs.readFileSync("./.s/lambda/Function.zip");
      const functionCode: FunctionCode = {
        ZipFile: ZipFile
      }
      props.Code = functionCode;
    });

    // 5. create Function
    // waiting for better solution: 
    //   https://stackoverflow.com/questions/37503075/invalidparametervalueexception-the-role-defined-for-the-function-cannot-be-assu
    Client.lambda().createFunction(props).catch((error) => {
      setTimeout(() => {
         Client.lambda().createFunction(props);
      }, 10000);
    });
    // 6. checkFunctionStaus and output
  }

  async remove(props) {
    return await Client.lambda().deleteFunction(props);
  }

  async build(props) {
    //TODO build
  }

  async get(functionName: any) {
    const { LastUpdateStatus } = await Client.lambda().getFunctionConfiguration({ FunctionName: functionName });
    logger.log(LastUpdateStatus);
  }

}

// user arn
const trustPolicyDocument = `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["sts:AssumeRole"],
    "Principal": {
      "Service": ["lambda.amazonaws.com"]
    }
  }]
}`;