import * as core from '@serverless-devs/core';
import Client from '../common/client';
import logger from '../common/logger';
import * as HELP from '../help/deploy';
import Alias from '../resource/alias'
import Function from '../resource/function'

const Command: string = "Deploy";

export default class Deploy {

  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);
    // commandParse (do it later)
    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
      boolean: ['help'],
      alias: { help: 'h' },
    });
    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    const subCommand = rawData[0] || 'all';
    if (!COMMAND.includes(subCommand)) {
      core.help(HELP.DEPLOY);
      throw new core.CatchableError(`Does not support ${subCommand} command`);
    }
    if (parsedData.help) {
      rawData[0]
        ? core.help(HELP[`remove_${subCommand}`.toLocaleUpperCase()])
        : core.help(HELP.DEPLOY);
      return { help: true, subCommand };
    }
    //TODO get deploy resource
    const props = inputs.props || {};
    // region
    const { region } = props;
    Client.REGION = region;
    // credentials
    const credentials = await core.getCredential(inputs.project.access);
    Client.CREDENTIALS = credentials;
    return {
      subCommand,
      props,
    };
  }

  async deploy({ props, subCommand }) {
    if (subCommand === "all") {
      Object.entries(props).forEach(async ([type, props]) => {
        if (type != "region" && subCommand != "Region") {
          await this.deployOne(type, props);
        }
      });
    } else {
      Object.entries(props).forEach(async ([type, props]) => {
        if (subCommand === type) {
          return await this.deployOne(type, props);
        }
      });
    }
  }

  async deployOne(type, props) {
    if (type === 'function') {
      //TODO YamlMapping
      return await this.deployFunction(props);
    }
    if (type === 'alias') {
      //TODO YamlMapping
      return await this.deployAlias(props);
    }
  }

  async deployFunction(props) {
    logger.info(`Start the ${Command} of ${props.FunctionName} (Function)`);
    try {
      let result = await new Function().deploy(props);
      if(result === true){
        logger.info(`End the ${Command} and ${props.FunctionName} (Function) deployed successfully !`);
      }else{
        logger.error(`Fail the ${Command}`);
      }
      return;
    } catch (error) {
      logger.error(`Fail the ${Command}: ${error}`);
      return;
    }
  }

  async deployAlias(props) {
    logger.info(`Start the ${Command} of ${props.Name} (Alias)`);
    try {
      await new Alias().deploy(props);
      logger.info(`End the ${Command} and ${props.Name} (Alias) deployed successfully ! `);
    } catch (error) {
      //const { requestId, cfId, extendedRequestId } = error.$$metadata;
      logger.error(`Fail the ${Command}: ${error}`);
      return;
    }
  }
}


export const COMMAND: string[] = [
  'all',
  'function',
  'alias',
];

