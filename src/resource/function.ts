import logger from '../common/logger';
//import { packTo } from '@serverless-devs/s-zip';
import Client from '../common/client';

export default class Function {
    
    async deploy(props) {
        try{
          // 1. Pack Code
          return (await Client.getInstance().createFunction(props));
        }catch(err){
            logger.error(err);
        }
    }

    async remove(functionName) {
        logger.log(`Removing Function ${functionName}`);
        return (await Client.getInstance().deleteFunction({ FunctionName: functionName }));
    }

    async build(props) {
      //TODO build
    }

    async get(functionName: any){
        const { LastUpdateStatus } = await Client.getInstance().getFunctionConfiguration({ FunctionName: functionName });
        logger.log(LastUpdateStatus);
    }

}