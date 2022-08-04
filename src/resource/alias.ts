/* eslint-disable no-await-in-loop */
import * as core from '@serverless-devs/core';
import * as HELP from '../help/alias';
import _ from 'lodash';

import Client from '../common/client';
import logger from '../common/logger';

//https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-alias.html
export default class Alias {

    static async handlerInputs(inputs) {
      logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);
  
      const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
        boolean: ['help', 'table', 'y', 'version-latest'],
        string: ['region', 'service-name', 'description', 'alias-name', 'id', 'gversion'],
        number: ['weight'],
        alias: { help: 'h', 'version-id': 'id', 'assume-yes': 'y' },
      });
      const parsedData = parsedArgs?.data || {};
      const rawData = parsedData._ || [];
      if (!rawData.length) {
        core.help(HELP.ALIAS);
        return { help: true };
      }
  
      const subCommand = rawData[0];
      logger.debug(`version subCommand: ${subCommand}`);
      if (!Object.keys(ALIAS_COMMAND_HELP_KEY).includes(subCommand)) {
        core.help(HELP.ALIAS);
        throw new core.CatchableError(`Does not support ${subCommand} command`);
      }
  
      if (parsedData.help) {
        core.help(HELP[ALIAS_COMMAND_HELP_KEY[subCommand]]);
        return { help: true, subCommand };
      }
  
      const props = inputs.props || {};
  
      const endProps: IProps = {
        region: parsedData.region || props.region,
        serviceName: parsedData['service-name'] || props.service?.name,
        description: parsedData.description,
        versionId: parsedData.id,
        versionLatest: parsedData['version-latest'],
        assumeYes: parsedData.y,
        aliasName: parsedData['alias-name'],
        gversion: parsedData.gversion,
        weight: parsedData.weight,
      };
  
      if (!endProps.region) {
        throw new Error('Not found region, Please specify with --region');
      }
      if (!endProps.serviceName) {
        throw new Error('Not found service name, Please specify with --service-name');
      }
      return {
        props,
        subCommand,
      };
    }
    
    async deploy(props) {
      logger.info(`Deploy alias: ${props.Name} of ${props.FunctionName}`);
      try{
        return await new Client().createAlias(props);
      }catch(err){
        logger.error(err);
        // try again
      }
    }

    async remove(props) {
      logger.info(`Removing alias: ${props.Name} of ${props.FunctionName}`);
      try{
        return await new Client().deleteAlias(props);
      }catch(err){
          logger.error(err);
          // try again
      }
    }

    async get(props) {
      try{
          await new Client().getAlias(props);
      }catch(err){
          logger.error(err);
          // try again
      }
    }
  }

interface IProps {
  region?: string;
  serviceName: string;
  description?: string;
  versionId?: string;
  versionLatest?: boolean;
  aliasName?: string;
  gversion?: string;
  weight?: number;
  assumeYes?: boolean;
}


const ALIAS_COMMAND_HELP_KEY: { [key: string]: string } = {
  list: 'ALIAS_LIST',
  get: 'ALIAS_GET',
  publish: 'ALIAS_PUBLISH',
  rollback: 'ALIAS_ROLLBACK',
};


