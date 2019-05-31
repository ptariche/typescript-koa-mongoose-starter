import JWT from 'jsonwebtoken';

import {ConfigJwtType} from './../types/';


/**
 * @param token - Takes a secret string to verify the payload
 * @returns A promise with the valid object or string, or invalid if null
*/
type VerifyFunction = (token:string|null) => Promise<object|string|null>;

/**
 * @param user - Signs the object with the JWT Secret
 * @returns A promise with a base64 encoded string
*/
type SignFunction   = (user: {id: string}) => Promise<string>;

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
