import { BaseContext } from 'koa';

import { Responses } from './../types';

class Blackhole {
  public static read = async (ctx: BaseContext) => {
    return ctx.respond(404, Responses.NOT_FOUND);
  };
};

export default Blackhole;
