import { Responses } from './../types';
import { BaseContext } from 'koa';

class Blackhole {
  public static read = async (ctx: BaseContext) => {
    return ctx.respond(404, Responses.NOT_FOUND);
  };
};

export default Blackhole;
