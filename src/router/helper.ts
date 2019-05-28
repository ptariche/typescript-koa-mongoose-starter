import {Joi as JOI} from 'koa-joi-router';
import { BaseContext } from 'koa';

enum methods {
  POST = 'post',
  GET = 'get',
  DELETE = 'delete',
  PUT = 'put'
};

enum contentType {
  JSON = 'json'
};

type defaultObject = { length: number };

const defaults: defaultObject = {
  length: 255
};

class Helper {
  public static defaults    = defaults;
  public static methods     = methods;
  public static contentType = contentType;
  public static validation  = async (ctx: BaseContext, next: Function) => {
    if (ctx.invalid) {
      let body:{details: Array<object>}         = ctx.invalid.body || ctx.invalid.query || ctx.invalid.params;  
      let response:Array<object|undefined|null> = body && body.details ? body.details : [];

      ctx.respond(412, response)
    } else {
      return await next();
    }
  };
    
  public static validationErrorResponse () {
    return {
      412: {
        body: {
          code: 412,
          error: JOI.array().items(JOI.object()).allow([])
        }
      }
    };
  };

  public static errorResponse (code: number) {
    return {
      [code]: {
        body: {
          code,
          error: JOI.object({
            message: JOI.string()
          })
        }
      }
    };
  };
};

export default Helper;
