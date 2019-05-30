import {version} from './../../package.json';
import { BaseContext } from 'koa';

enum STATUS {
  PASS = 'pass',
  FAIL = 'fail',
  WARN = 'warn',
}
  
class Health {
  public static read = async (ctx: BaseContext) => {
    return ctx.respond(200, {
      status: STATUS.PASS,
      version,
      timestamp: (new Date()).toISOString(),
      uptime: process.uptime()
    });
  };
};

export default Health;
