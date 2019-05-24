import {ConfigServerType} from './types/';

import SERVER from './server';
const {env: ENV} = process;

process.on('unhandledRejection', (err) => console.error(err));
process.on('uncaughtException',  (err) => console.error(err.stack || err));


class Services {
  public static server = () => {

    let CONFIG:ConfigServerType = {
      port: (ENV.PORT ? +ENV.PORT : 3000),
      mongo_uri: ENV.MONGO_URI   ? ENV.MONGO_URI   : 'mongodb://localhost:27017/test',
      jwt_secret: ENV.JWT_SECRET ? ENV.JWT_SECRET  :'12345678901234567890'
    };
  
    const Server = new SERVER(CONFIG);
    return Server.initiate().listen();
  };
};

export default Services.server();