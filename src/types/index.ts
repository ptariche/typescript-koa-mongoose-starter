import { Middleware as KoaMiddleware} from 'koa';

type ConfigServerType    = { port: number, mongo_uri: string, jwt_secret: string };
type ConfigJwtType       = { secret: string };
type JwtFunctionResponse = { middleware: KoaMiddleware, authenticate: KoaMiddleware };

enum Responses {
  NOT_FOUND            = 'Not Found',
  CANT_CREATE_USER     = 'Unable to create user',
  NO_ACCESS_USER       = 'You do not have access to this User',
  INTERNAL_ERROR       = 'An internal server has error occured',
  SOMETHING_WENT_WRONG = 'Something went very wrong',
  INVALID_CREDS        = 'Invalid Credentials'
};

export {
  ConfigServerType,
  ConfigJwtType,
  Responses,
  JwtFunctionResponse
};
