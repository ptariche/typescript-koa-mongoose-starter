import ROUTER from 'koa-joi-router';

import {JwtFunctionResponse} from './types/';

import BLACKHOLE_ROUTES from './router/blackhole';
import USER_ROUTES from './router/user';
import LOGIN_ROUTES from './router/login';
import HEALTH_ROUTES from './router/health';

class Router {
  public static initiate (jwtMiddleware: JwtFunctionResponse): {private: ROUTER.Router, public: ROUTER.Router} {
    const publicRouter  = ROUTER();
    const privateRouter = ROUTER();

    privateRouter.use(jwtMiddleware.authenticate);

    privateRouter.route(USER_ROUTES.read)
    privateRouter.route(USER_ROUTES.update)

    publicRouter.route(USER_ROUTES.create);
    publicRouter.route(LOGIN_ROUTES.create);
    publicRouter.route(HEALTH_ROUTES.read);

    publicRouter.get('*', BLACKHOLE_ROUTES.read.handler);
    publicRouter.post('*', BLACKHOLE_ROUTES.read.handler);
    publicRouter.delete('*', BLACKHOLE_ROUTES.read.handler);
    publicRouter.put('*', BLACKHOLE_ROUTES.read.handler);
    publicRouter.patch('*', BLACKHOLE_ROUTES.read.handler);

    return {private: privateRouter, public: publicRouter};
  };
};

export default Router;
