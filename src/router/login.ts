import {Joi as JOI, Spec } from 'koa-joi-router';

import HELPER from './helper';
import LOGIN_CONTROLLER from '../controller/login';

class LoginRouter {
  public static create:Spec = ({
    method: HELPER.methods.POST,
    path: '/login',
    validate: {
      continueOnError: true,
      type: HELPER.contentType.JSON,
      output: Object.assign({}, HELPER.errorResponse(401), HELPER.validationErrorResponse(), {
        200: {
          body: JOI.object({
            code: 200,
            data: JOI.object({
              user_id: JOI.string(),
              token: JOI.string()
            })
          }).options({stripUnknown: true})
        }
      })
    },
    handler: [HELPER.validation, LOGIN_CONTROLLER.create]
  });
};

export default LoginRouter;
