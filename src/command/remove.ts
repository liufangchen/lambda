import * as core from '@serverless-devs/core';
import logger from '../common/logger';
import * as HELP from '../help/remove';
import Client from '../common/client';
import Alias from '../resource/alias'
import Function from '../resource/function'

export default class Remove {

    static async handlerInputs(inputs) {
      logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);  
      const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
        boolean: ['help'],
        alias: { help: 'h' },
      });
  
      const parsedData = parsedArgs?.data || {};
      const rawData = parsedData._ || [];
  
      const subCommand = rawData[0];
      logger.debug(`remove subCommand: ${subCommand}`);
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
      const {region} = props;
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
    
    async start( {props , subCommand}) {
        // 1.confirm resource
        // 2.use decide to remove（yes/no）
        // 3.then remove resource
        Object.entries(props).forEach(([k, v]) => {
            if( k === subCommand || subCommand === "all"){
                this.removeOne(v,subCommand);
            }
          });
    }

    async removeOne( props: unknown , subCommand: string) {
        if (subCommand === 'function') {
            await new Function().remove(props);
        }
        if (subCommand === 'alias') {
            await new Alias().remove(props);
        }
        //output remove status
        //logger.info(`Resource "Name" remove Success`)
    }
}

export const COMMAND: string[] = [
    'function',
    'alias',
  ];


