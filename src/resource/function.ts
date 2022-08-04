import logger from '../common/logger';
//import { packTo } from '@serverless-devs/s-zip';
import Client from '../common/client';

export default class Function {
    
    async deploy(props) {
        try{
          // 1. Pack Code
          return (await new Client().createFunction(props));// with code
        }catch(error){
            const { requestId, cfId, extendedRequestId } = error.$$metadata;
            logger.error({ requestId, cfId, extendedRequestId });
        }
    }

    async remove(functionName) {
        logger.log(`Removing Function ${functionName}`);
        return (await new Client().deleteFunction({ FunctionName: functionName }));
    }

    async build(props) {
      //TODO build
    }

    async get(functionName: any){
        const { LastUpdateStatus } = await new Client().getFunctionConfiguration({ FunctionName: functionName });
        logger.log(LastUpdateStatus);
    }

}