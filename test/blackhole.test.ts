import http from 'http';
import request from 'supertest';
import Server from './../src/server';
import chai from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();

let server:null|http.Server = null;

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

beforeEach( async () => {
  const uri    = await mongoServer.getConnectionString()
  let instance = new Server({mongo_uri: uri, port: getRandomInt(4000, 10000), jwt_secret: '2345678945678'});
  server       = http.createServer(instance.listen().callback());
})

afterEach(() => {
  server.close();
});

describe('POST /random', () => {
  it('should return some defined error message with valid parameters', (done) => {
    const expect = chai.expect;
    return request(server).post('/random')
      .expect(404)
      .end(function(err, res) {
        expect(err).not.to.be.undefined;
        done();
      });
  });
});

