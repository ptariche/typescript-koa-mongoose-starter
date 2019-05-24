import { BaseContext } from 'koa';
import { Responses } from './../types';

import UserModel from './../model/user';

class UserController {
  public static create = async (ctx: BaseContext) => {
    const body:object = ctx.request.body;
    const createUser  = await UserModel.create(body).catch( err => null);

    if (createUser) {
      let response = createUser.toNormalization();
      return ctx.respond(201, response);
    } else {
      return ctx.respond(400, Responses.CANT_CREATE_USER);
    }
  };

  public static read = async (ctx: BaseContext) => {
    if (ctx.params.id !== ctx.state.user.id) return ctx.respond(403, Responses.NO_ACCESS_USER);

    const user = await UserModel.findById(ctx.state.user.id);

    if (user) {
      let response = user.toNormalization();
      return ctx.respond(200, response);
    } else {
      return ctx.respond(400, Responses.SOMETHING_WENT_WRONG);
    }
  };

};

export default UserController;
