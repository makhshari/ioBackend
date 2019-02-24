import Joi from 'joi';
import {UsernameSchema} from '../../../../schemas/user-schema';


let UsernameExists = (redis, username, callback) => {
  redis.hexists(global.consts.REDIS_KEYS.USER_PRIMARY_USERNAME, username)
  .then(response => {
    callback(null, response);
  })
  .catch(error => {
    callback(error, -1);
  });
};

let VerifyUsernameModule = (redis, req, res) => {
  if(req.headers.api_token != global.consts.API_PRIVATE_CONFIGS.TOKEN_VALUE){
    return res(global.errors.TOKEN_MISMATCH);
  }
  let payload = req.payload;
  let validation = Joi.validate(payload, UsernameSchema);

  if (!validation.error) {
    UsernameExists(redis, payload.username, (err, exists) => {
      if(err)
        return res(global.errors.DB);

      if(exists)
        return res(global.errors.USERNAME_EXISTS);

      return res(global.messages.USERNAME_IS_VALID);
    });
  } else {
    return res(global.errors.INVALID_REQUEST);
  }
};

export {UsernameExists, VerifyUsernameModule};
