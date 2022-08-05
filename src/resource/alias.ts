/* eslint-disable no-await-in-loop */
import _ from 'lodash';

import Client from '../common/client';
import logger from '../common/logger';

export default class Alias {
  async deploy(props) {
      return await new Client().createAlias(props);
  }

  async remove(props) {
      return await new Client().deleteAlias(props);
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


