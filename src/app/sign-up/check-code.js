import Bcrypt from 'bcrypt';
import Joi from 'joi';
import {CodeSchema} from '../../schemas/user-schema'


export default function (axios, req, res) {
  if(req.headers.app_token != global.consts.APP_CONFIGS.TOKEN_VALUE){
    return res(global.errors.TOKEN_MISMATCH);
  }
  let payload = req.payload;
  let yar = req.yar;
  let validation = Joi.validate(payload, CodeSchema);

  if (!validation.error){
    Bcrypt.compare(payload.smsCode, yar.get('hashed_sms').code, (error, equal) => {
      if(error)
        return res(global.errors.OTHERS);
      if(equal){
        return res(global.messages.PHONE_VERIFIED);
      } else{
        return res(global.errors.PHONE_VERIFY_FAILED);
      }
    });
  } else{
    return res(global.errors.INVALID_REQUEST);
  }
}