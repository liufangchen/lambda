import * as core from '@serverless-devs/core';
import logger from '../common/logger';
import * as HELP from '../help/remove';
import Client from '../common/client';
import Alias from '../resource/alias'
import Function from '../resource/function'

export default class Remove {

  Command: string = "Remove";
  Config:any;

  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);
    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
      boolean: ['help'],
      alias: { help: 'h' },
    });
    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    const subCommand = rawData[0] || 'all';
    if (subCommand && !COMMAND.includes(subCommand)) {
      core.help(HELP.REMOVE);
      throw new core.CatchableError(`Does not support ${subCommand} command`);
    }
    if (parsedData.help) {
      rawData[0]
        ? core.help(HELP[`remove_${subCommand}`.toLocaleUpperCase()])
        : core.help(HELP.REMOVE);
      return { help: true, subCommand };
    }
    const props = inputs.props || {};
    // region
    const { region } = props;
    Client.REGION = region;
    // credentials
    const credentials = await core.getCredential(inputs.project.access);
    Client.CREDENTIALS = credentials;
    // commandParameter cover props
    return {
      props,
      subCommand,
    };
  }

  async remove({ props, subCommand }) {
    // 1.confirm resource
    // 2.use decide to remove（yes/no）
    // 3.then remove resource
    if (subCommand === "all") {
      Object.entries(props).forEach(async ([type, props]) => {
        if (type != "region" && subCommand != "Region") {
          await this.removeOne(type, props);
        }
      });
    } else {
      Object.entries(props).forEach(async ([type, props]) => {
        if (subCommand === type) {
          return await this.removeOne(type, props);
        }
      });
    }
  }

  async removeOne(type, props) {
    if (type === 'function') {
      //TODO YamlMapping
      return await this.removeFunction(props);
    }
    if (type === 'alias') {
      //TODO YamlMapping
      return await this.removeAlias(props);
    }
  }

  async removeFunction(props) {
    logger.info(`Start the ${this.Command} function: ${props.FunctionName} (Function)`);
    try {
      let result = await new Function().remove(props);
      logger.info(`End the ${this.Command} and ${props.FunctionName} (Function) removed successfully ! (${result.$metadata.httpStatusCode as number})`);
    } catch (error) {
      logger.error(`Fail the ${this.Command}: ${error} `);
      return;
    }
  }

  async removeAlias(props) {
    logger.info(`Start the ${this.Command} Alias: ${props.Name} (Alias)`);
    try {
      let result = await new Alias().remove(props);
      logger.info(`End the ${this.Command} and ${props.Name} (Alias) removed successfully ! (${result.$metadata.httpStatusCode as number})`);
    } catch (error) {
      logger.error(`Fail the ${this.Command}: ${error} }`);
      return;
    }
  }
}

export const COMMAND: string[] = [
  'all',
  'function',
  'alias',
];


