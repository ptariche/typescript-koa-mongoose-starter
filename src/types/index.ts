import { Middleware as KoaMiddleware, BaseContext} from 'koa';
import JWT from './../lib/jwt';

type ConfigServerType    = { port: number, mongo_uri: string, jwt_secret: string };
type ConfigJwtType       = { secret: string };
type JwtFunctionResponse = { middleware: KoaMiddleware, authenticate: KoaMiddleware };
type UserStateType       = { id: string };
type ConfigStateType     = {
  user: UserStateType|null
};

enum Responses {
  NOT_FOUND            = 'Not Found',
  CANT_CREATE_USER     = 'Unable to create user',
  CANT_UPDATE_USER     = 'Unable to update user',
  NO_ACCESS_USER       = 'You do not have access to this User',
  INTERNAL_ERROR       = 'An internal server has error occured',
  SOMETHING_WENT_WRONG = 'Something went very wrong',
  INVALID_CREDS        = 'Invalid Credentials'
};

interface ModifiedContext extends BaseContext {
  jwt: JWT,
  respond: (status: number, body: object|string) => Function
  state: ConfigStateType
}

export {
  ConfigServerType,
  ConfigJwtType,
  Responses,
  JwtFunctionResponse,
  ModifiedContext
};
