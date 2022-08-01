import logger from './common/logger';
import { InputProps } from './common/entity';

export default class lambda {

  public async test(inputs: InputProps) {
    logger.debug(`input: ${JSON.stringify(inputs.props)}`);
    logger.info('command test');
    return { hello: 'world' };
  }


  async plan(inputs: InputProps) {
    logger.info('TODO');
    return { hello: 'world' };
  }

  async deploy(inputs: InputProps): Promise<any> {
    logger.info('TODO');
    return { hello: 'world' };
  }

  async remove(inputs: InputProps): Promise<any> {
    logger.info('TODO');
    return { hello: 'world' };
  }


  async info(inputs: InputProps): Promise<any> {
    logger.info('TODO');
    return { hello: 'world' };
  }

  async build(inputs: InputProps): Promise<any> {
    logger.info('TODO');
    return { hello: 'world' };
  }

  async local(inputs: InputProps): Promise<any> {
    logger.info('TODO');
    return { hello: 'world' };
  }

  async invoke(inputs: InputProps): Promise<any> {
    logger.info('TODO');
    return { hello: 'world' };
  }

  async logs(inputs: InputProps): Promise<any> {
    logger.info('TODO');
    return { hello: 'world' };
  }
}
