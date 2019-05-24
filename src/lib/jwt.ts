import JWT from 'jsonwebtoken';

import {ConfigJwtType} from './../types/';

type VerifyFunction = (token:string|null) => Promise<object|string|null>;
type SignFunction   = (user: {id: string}) => Promise<object|string>;

class Jwt {
  protected secret:string;

  constructor (config: ConfigJwtType) {
    this.secret = config.secret
  };

  public verify:VerifyFunction = (token) => {
    return new Promise ((resolve, reject) => {
      if (!token) reject(null);
      JWT.verify(token, this.secret, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(response);
        }
      });
    });
  };

  public sign:SignFunction = (user) => {
    return new Promise ((resolve, reject) => {
      JWT.sign(user, this.secret, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(response);
        }
      });
    });
  };

}

export default Jwt;
