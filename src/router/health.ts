import {Joi as JOI, Spec } from 'koa-joi-router';

import HELPER from './helper';
import HEALTH_CONTROLLER from '../controller/health';

class HealthRouter {
  public static read:Spec = ({
    method: HELPER.methods.GET,
    path: '/health',
    handler: HEALTH_CONTROLLER.read,
    validate: {
      continueOnError: true,
      output: {
        200: {
          body: JOI.object({
            code: 200,
            data: JOI.object({
              status: JOI.string(),
              version: JOI.string(),
              timestamp:JOI.string().isoDate(),
              uptime: JOI.number()
            })
          }).options({stripUnknown: true})
        }
      }
    }
  });
};

export default HealthRouter;
