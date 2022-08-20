import * as core from '@serverless-devs/core';
import logger from './common/logger';
import { InputProps } from './common/entity';
import Remove from './command/remove';
import Deploy from './command/deploy';
import Client from './common/client';

const { colors } = core;

export default class lambda {

  public async deploy(inputs: InputProps): Promise<any> {
    const { help, props, subCommand } = await Deploy.handlerInputs(inputs);
    if (help) { return; }
    return await new Deploy().deploy({ props, subCommand });
  }

  public async remove(inputs: InputProps): Promise<any> {
    const { help, props, subCommand } = await Remove.handlerInputs(inputs);
    if (help) { return; }
    return await new Remove().remove({ props, subCommand });
  }

  public async test(inputs: InputProps): Promise<any> {
    const { region} = inputs.props;
    Client.REGION = region;
    const credentials = await core.getCredential(inputs.project.access);
    Client.CREDENTIALS = credentials;

    let result;
    try{
      result = await Client.lambda().getFunction(inputs.props.function);
    }catch(error){
      const { httpStatusCode } = error.$metadata;
      if (httpStatusCode ===404){
        console.log("No Resource ")
      }
      console.log(error)
    }
    console.log(result)
  }
  
  public async alias(inputs: InputProps) {
    logger.log(`🚀 The ${inputs.command} of lambda coming soon...\n`);
    logger.log(`👉 Follow the latest progress: ` + colors.cyan.underline(`https://github.com/liufangchen/lambda/wiki/${inputs.command}`));
  }

  public async build(inputs: InputProps): Promise<any> {
    logger.log(`🚀 The ${inputs.command} of lambda coming soon...\n`);
    logger.log(`👉 Follow the latest progress: ` + colors.cyan.underline(`https://github.com/liufangchen/lambda/wiki/${inputs.command}`));
  }

  public async local(inputs: InputProps): Promise<any> {
    logger.log(`🚀 The ${inputs.command} of lambda coming soon...\n`);
    logger.log(`👉 Follow the latest progress: ` + colors.cyan.underline(`https://github.com/liufangchen/lambda/wiki/${inputs.command}`));
  }

  public async invoke(inputs: InputProps): Promise<any> {
    logger.log(`🚀 The ${inputs.command} of lambda coming soon...\n`);
    logger.log(`👉 Follow the latest progress: ` + colors.cyan.underline(`https://github.com/liufangchen/lambda/wiki/${inputs.command}`));
  }

  public async logs(inputs: InputProps): Promise<any> {
    logger.log(`🚀 The ${inputs.command} of lambda coming soon...\n`);
    logger.log(`👉 Follow the latest progress: ` + colors.cyan.underline(`https://github.com/liufangchen/lambda/wiki/${inputs.command}`));
  }
}
