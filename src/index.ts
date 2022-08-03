import * as core from '@serverless-devs/core';
import logger from './common/logger';
import { InputProps } from './common/entity';
import Remove from './command/remove'
import Deploy from './command/deploy'
const { colors } = core;

export default class lambda {

  public async deploy(inputs: InputProps): Promise<any> {
    const { help, props, subCommand } = await Deploy.handlerInputs(inputs);
    if (help) { return; }
    await new Deploy().start({ props, subCommand });
  }

  public async remove(inputs: InputProps): Promise<any> {
    const { help, props, subCommand } = await Remove.handlerInputs(inputs);
    if (help) { return; }
    await new Remove().start({ props, subCommand });
  }

  public async test(inputs: InputProps): Promise<any> {
    const { help, props, subCommand } = await Deploy.handlerInputs(inputs);
    console.log(props,subCommand);
    if (help) { return; }
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
