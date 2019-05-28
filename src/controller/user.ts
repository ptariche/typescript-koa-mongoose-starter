import { BaseContext } from 'koa';
import { Responses } from './../types';

import UserModel, {UserDocument, UserType} from './../model/user';

type InputCreateBodyType = {first_name: string, last_name: string, password: string, email: true};
type InputUpdateBodyType = {first_name: string, last_name: string};

class UserController {
  public static create = async (ctx: BaseContext) => {
    const body:InputCreateBodyType      = ctx.request.body;
    const createUser:UserDocument|null  = await UserModel.create(body).catch( err => null);

    if (createUser) {
      let response:UserType = createUser.toNormalization();
      return ctx.respond(201, response);
    } else {
      return ctx.respond(400, Responses.CANT_CREATE_USER);
    }
  };

  public static read = async (ctx: BaseContext) => {
    if (!ctx.state.user || ctx.params.id !== ctx.state.user.id) return ctx.respond(403, Responses.NO_ACCESS_USER);

    const user:UserDocument|null = await UserModel.findById(ctx.state.user.id);

    if (user) {
      let response:UserType = user.toNormalization();
      return ctx.respond(200, response);
    } else {
      return ctx.respond(400, Responses.SOMETHING_WENT_WRONG);
    }
  };

  public static update = async (ctx: BaseContext) => {
    if (!ctx.state.user || ctx.params.id !== ctx.state.user.id) return ctx.respond(403, Responses.NO_ACCESS_USER);

    const body:InputUpdateBodyType      = ctx.request.body;
    const updateUser:UserDocument|null  = await UserModel.findByIdAndUpdate(ctx.state.user.id, {$set: body}, {new: true}).exec().catch( err => null);

    if (updateUser) {
      let response:UserType = updateUser.toNormalization();
      return ctx.respond(200, response);
    } else {
      return ctx.respond(400, Responses.CANT_UPDATE_USER);
    }
  };

};

export default UserController;