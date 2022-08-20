import * as core from '@serverless-devs/core';
import logger from '../common/logger';
import { zip } from '@serverless-devs/core';
import Client from '../common/client';
import { FunctionCode, Lambda, Runtime,PackageType } from '@aws-sdk/client-lambda';
import fs from 'fs';
import { randomInt } from 'crypto';
import { IAM } from '@aws-sdk/client-iam';

export default class Function {

  client: Lambda
  iam: IAM

  constructor() {
    this.iam = Client.iam();
    this.client = Client.lambda();
  }

  async deploy(props) : Promise<any> {
    let isExist : boolean = false;
    let { Role, FunctionName,Event } = props;
    // 1. validate
    this.validate(props);
    // 2. check Function Exist
    try{
      let resp = await this.client.getFunction(props);
      isExist = true;
      logger.log("Function Exist")
      logger.log(resp.Configuration)
    }catch(error){
      const { httpStatusCode } = error.$metadata;
      if (httpStatusCode === 404){
        isExist = false;
        logger.log("Function is non-existent")
      }
    }
    // 4. build function - support zip type at first （CodeSize < 10M）
    await this.build(props);
    // 5. deploy Function
    if(isExist === false){ // create function
      if (!Role) {
        logger.warn(`Role isn't specified, auto created for you.`);
        const roleName = `serverless-devs-Role -${randomInt(999999)}`;
        logger.log(`Start generating roleName: ${roleName}`);
        let { Role } = await this.iam.createRole({
          AssumeRolePolicyDocument: trustPolicyDocument,
          RoleName: roleName,
          Description: "LambdaFunction",
          Path: "/serverless-devs/"
        });
        props.Role = Role.Arn;
      }
      // https://stackoverflow.com/questions/37503075/invalidparametervalueexception-the-role-defined-for-the-function-cannot-be-assu
      this.client.createFunction(props).catch((error) => {
        setTimeout(() => {
          this.client.createFunction(props);
        }, 10000);
      });
    }else{//update function
      await this.client.updateFunctionConfiguration(props);
      await this.client.updateFunctionCode(props);// checkImage sha256
    }
    // 6. ensure Function State
    const { LastUpdateStatus,State } = await this.client.getFunctionConfiguration({ FunctionName: FunctionName });
    if(State === 'Active' && LastUpdateStatus === 'Successful'){
      return true;
    }else{
      return false;
    }
    // try get role : const { Role } = await Client.iam().getRole();
  }

  async remove(props) {
    return await Client.lambda().deleteFunction(props);
  }

  async build(props) {
    let { Code,PackageType} = props;
    zip({ codeUri: Code, outputFilePath: "./.s/lambda", outputFileName: "Function.zip" }).finally(() => {
      let ZipFile = fs.readFileSync("./.s/lambda/Function.zip");
      const functionCode: FunctionCode = {
        ZipFile: ZipFile
      }
      props.Code = functionCode;
    });
  }

  async get(functionName: any) {
    const { LastUpdateStatus } = await Client.lambda().getFunctionConfiguration({ FunctionName: functionName });
    logger.log(LastUpdateStatus);
  }

  async validate(props){
    // Role（auto）, code, config
    if (!(props.PackageType in PackageType)) {
      throw new core.CatchableError(`Please check PackageType ${props.PackageType}`);
    }
    if (!(props.Runtime in Runtime)) {
      throw new core.CatchableError(`Please check Runtime ${props.Runtime}`);
    }
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