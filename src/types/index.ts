import { Middleware as KoaMiddleware, BaseContext} from 'koa';
import JWT from './../lib/jwt';

/**
 * @remarks
 * This method is part of the Server Config.
 *
 * @param port - A Port to run the server on
 * @param mongo_uri - The mongo uri mongo://127.0.0.1:27017/test
 * @param jwt_secret - The secret JWT uses to create a signature for the payload
 */
type ConfigServerType    = { port: number, mongo_uri: string, jwt_secret: string };

/**
 * @remarks
 * This method is part of the JWT Config.
 *
 * @param secret - The secret JWT uses to create a signature for the payload
 */
type ConfigJwtType       = { secret: string };

/**
 * @param middleware - A Koa Middleware thar injects JWT into Koa Context
 * @param authenticate - A Koa Middleware that checks if a jwt header is valid and allows the next middleware if so
 */
type JwtFunctionResponse = { middleware: KoaMiddleware, authenticate: KoaMiddleware };

type UserStateType       = { id: string };

/**
 * @remarks
 * Extends ctx.state.user type to the base context
 */
type ConfigStateType     = {
  user: UserStateType|null
};

/**
 * @remarks
 * Response options
 */
enum Responses {
  NOT_FOUND            = 'Not Found',
  CANT_CREATE_USER     = 'Unable to create user',
  CANT_UPDATE_USER     = 'Unable to update user',
  NO_ACCESS_USER       = 'You do not have access to this User',
  INTERNAL_ERROR       = 'An internal server has error occured',
  SOMETHING_WENT_WRONG = 'Something went very wrong',
  INVALID_CREDS        = 'Invalid Credentials'
};

/**
 * @remarks
 * Extends the base context with KWT, Respond and State
 */
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
