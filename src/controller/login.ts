import { BaseContext } from 'koa';
import { Responses } from './../types';

import UserModel from './../model/user';

class Login {
  public static create = async (ctx: BaseContext) => {
    const { 
      email, password 
    } = ctx.request.body;

    const user = await UserModel.findOne({email: email});

    if (user) {
      const isMatched = await user.comparePassword(password).catch(err => null);
      if (isMatched === true) {
        const {id}  = user.toNormalization();
        const token = await ctx.jwt.sign({id: id});

        return ctx.respond(200, { token, user_id: id });
      } else {
        return ctx.respond(401, Responses.INVALID_CREDS);
      }
    } else {
      return ctx.respond(401, Responses.INVALID_CREDS);
    }
  };
};

export default Login;
