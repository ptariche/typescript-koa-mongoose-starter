import { BaseContext, Middleware as KoaMiddleware} from 'koa';
import { Responses, JwtFunctionResponse} from './../types/';
import JWT from './../lib/jwt';


type JwtFunction           = (secret: string) => JwtFunctionResponse;
type AuthorizationFunction = (ctx: BaseContext) => string|null;

class Middleware {
  private static resolveAuthorizationHeader:AuthorizationFunction = (ctx: BaseContext) => {
    if (!ctx.header || !ctx.header.authorization) {
      return;
    }
  
    const PARTS = ctx.header.authorization.split(' ');
  
    if (PARTS.length === 2) {
      const SCHEME:string      = PARTS[0];
      const CREDENTIALS:string = PARTS[1];
  
      if (/^Bearer$/i.test(SCHEME)) {
        return CREDENTIALS;
      }
    }
  
    return null;
  };

  public static jwt:JwtFunction = (secret) => {
    const Jwt = new JWT({secret});

    class JwtClass {
      public static middleware = async (ctx: BaseContext, next: Function) => {
        ctx.jwt = Jwt;
        return await next();
      };

      public static authenticate = async (ctx: BaseContext, next: Function) => {
        const token = Middleware.resolveAuthorizationHeader(ctx);
      
        if (token !== null) {
          const decodedToken:{id: string}|null = await Jwt.verify(token).catch( err => null);
          if (decodedToken) {
            ctx.state.user = decodedToken;
            return await next();
          } else {
            return ctx.respond(401, Responses.INVALID_CREDS);
          }
        } else {
          return ctx.respond(401, Responses.INVALID_CREDS);
        }
      }
    }

    return JwtClass;
  };

  public static respond:KoaMiddleware = async (ctx: BaseContext, next: Function) => {
    ctx.respond = (status: number, body: object|string) => {
      ctx.status        = status;

      let error:boolean = false;

      if (status >= 299 || status < 200) {
        error = true;
      }

      if (error === true) {
        ctx.body = {
          code: ctx.status,
          error: (Array.isArray(body)) ? body : {message: body}    
        };
      } else {
        ctx.body = {
          code: ctx.status,
          data: (typeof body === 'object') ? body : (Array.isArray(body)) ? body : {message: body}
        };
      }

      return ctx;
    };

    await next();
  };
  
  public static onError:KoaMiddleware = async (ctx: BaseContext, next: Function) => {
    try {
      await next();
    } catch (err) {
      console.error(err.stack || err);
      ctx.respond(500, Responses.INTERNAL_ERROR);
    }
  };
};

export default Middleware;
