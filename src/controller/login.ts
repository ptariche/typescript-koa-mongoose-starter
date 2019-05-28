import { BaseContext } from 'koa';
import { Responses } from './../types';

import UserModel, {UserDocument, UserType} from './../model/user';

type InputBodyType = {email: string, password: string};

class Login {
  public static create = async (ctx: BaseContext) => {
    const { 
      email, password
    } = <InputBodyType>ctx.request.body;

    const user:UserDocument|null = await UserModel.findOne({email: email});

    if (user) {
      const isMatched = await user.comparePassword(password).catch(err => null);
      if (isMatched === true) {
        const {id}         = <UserType>user.toNormalization();
        const token:string = await ctx.jwt.sign({id: id});

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
