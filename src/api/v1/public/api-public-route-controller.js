import IoRedis from 'ioredis';


const redis = new IoRedis(global.consts.REDIS_CONFIGS.PORT, global.consts.REDIS_CONFIGS.URL);

let FooFunction = (req, res) => {
  //TODO: First public API handler

};

export {FooFunction};