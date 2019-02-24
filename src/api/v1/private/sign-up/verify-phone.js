import Joi from 'joi';
import {PhoneSchema} from '../../../../schemas/user-schema';


let PhoneExists = (redis, phone, callback) => {
  redis.hexists(global.consts.REDIS_KEYS.USER_PRIMARY_PHONE, phone)
  .then(response => {
    callback(null, response);
  })
  .catch(error => {
    callback(error, -1);
  });
};

let VerifyPhoneModule = (redis, req, res) => {
  if(req.headers.api_token != global.consts.API_PRIVATE_CONFIGS.TOKEN_VALUE){
    return res(global.errors.TOKEN_MISMATCH);
  }
  let payload = req.payload;
  let validation = Joi.validate(payload, PhoneSchema);

  if (!validation.error) {
    PhoneExists(redis, payload.phone, (err, exists) => {
      if(err)
        return res(global.errors.DB);

      if(exists)
        return res(global.errors.PHONE_EXISTS);

      return res(global.messages.PHONE_IS_VALID);
    });
  } else {
    return res(global.errors.INVALID_REQUEST);
  }
};

export {PhoneExists, VerifyPhoneModule};