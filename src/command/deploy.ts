import * as core from '@serverless-devs/core';
import Client from '../common/client';
import logger from '../common/logger';
import * as HELP from '../help/deploy';
import Alias from '../resource/alias'
import Function from '../resource/function'

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
      const subCommand = rawData[0];
      if (subCommand && !COMMAND.includes(subCommand)) {
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
      const {region} = props;
      Client.REGION = region;

      // credentials
      const credentials = await core.getCredential(inputs.project.access);
      Client.CREDENTIALS = credentials;
      return {
        subCommand,
        props,
      };
    }

    async start( {props , subCommand}) {
      Object.entries(props).forEach(([k, v]) => {
        if( k === subCommand || subCommand === "all"){
            this.deployOne(v,subCommand);
        }
      });
    }

    async deployOne( props , subCommand) {
      //TODO YamlMapping
      if (subCommand === 'function') {
        await new Function().deploy(props);
      }
      if (subCommand === 'alias') {
          await new Alias().deploy(props);
      }
    }
}

export const COMMAND: string[] = [
    'function',
    'alias',
  ];

