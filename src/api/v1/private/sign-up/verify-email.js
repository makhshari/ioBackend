import Joi from 'joi';
import {EmailSchema} from '../../../../schemas/user-schema';


let EmailExists = (redis, email, callback) => {
  redis.hexists(global.consts.REDIS_KEYS.USER_PRIMARY_EMAIL, email)
  .then(response => {
    callback(null, response);
  })
  .catch(error => {
    callback(error, -1);
  });
};

let VerifyEmailModule = (redis, req, res) => {
  if(req.headers.api_token != global.consts.API_PRIVATE_CONFIGS.TOKEN_VALUE){
    return res(global.errors.TOKEN_MISMATCH);
  }
  let payload = req.payload;
  let validation = Joi.validate(payload, EmailSchema);

  if (!validation.error){
    EmailExists(redis, payload.email, (error, exists) => {
      if(error)
        return res(global.errors.DB);

      if(exists)
        return res(global.errors.EMAIL_EXISTS);

      return res(global.messages.EMAIL_IS_VALID);
    });
  } else{
    return res(global.errors.INVALID_REQUEST);
  }
};

export {EmailExists, VerifyEmailModule};