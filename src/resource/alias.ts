/* eslint-disable no-await-in-loop */
import _ from 'lodash';

import Client from '../common/client';
import logger from '../common/logger';

export default class Alias {
  async deploy(props) {
      return await Client.lambda().createAlias(props);
  }

  async remove(props) {
      return await Client.lambda().deleteAlias(props);
  }

  async get(props) {
    try{
        await Client.lambda().getAlias(props);
    }catch(err){
        logger.error(err);
        // try again
    }
  }
}


