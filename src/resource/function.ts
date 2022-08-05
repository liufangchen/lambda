import logger from '../common/logger';
import { zip } from '@serverless-devs/core';
import Client from '../common/client';
import { FunctionCode } from '@aws-sdk/client-lambda';
import fs from 'fs';

export default class Function {

  async deploy(props) {
    const { Code, Role } = props;
    // 1. validate - Role（auto）
    // 2. checkFunctionExist
    // 3. checkImage
    // 4. package code if PackageType is zip, not image
    await zip({ codeUri: Code, outputFilePath: "./.s/lambda", outputFileName: "Function.zip" })
      .finally(() => {
        let ZipFile = fs.readFileSync("./.s/lambda/Function.zip");
        const functionCode: FunctionCode = {
          ZipFile: ZipFile
        }
        props.Code = functionCode;
      });
    // 5. create Function
    return (await new Client().createFunction(props));
    // 6. checkFunctionStaus
  }

  async remove(props) {
    return await new Client().deleteFunction(props);
  }

  async build(props) {
    //TODO build
  }

  async get(functionName: any) {
    const { LastUpdateStatus } = await new Client().getFunctionConfiguration({ FunctionName: functionName });
    logger.log(LastUpdateStatus);
  }

}