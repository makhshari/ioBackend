import Joi from 'joi';
import {UserSchema} from '../../../../schemas/user-schema';
import Bcrypt from 'bcrypt';
import {EmailExists} from './verify-email';
import {PhoneExists} from './verify-phone';
import {UsernameExists} from './verify-username';


export default (redis, req, res) => {
  if(req.headers.api_token != global.consts.API_PRIVATE_CONFIGS.TOKEN_VALUE){
    return res(global.errors.TOKEN_MISMATCH);
  }
  const saltRounds = 12;
  let payload = req.payload;
  let validation = Joi.validate(payload, UserSchema);
  let errors = [];
  
  if (!validation.error){
    // Username exists checking
    UsernameExists(redis, payload.username, (errorResponseUsername, existsUsername) => {
      if(errorResponseUsername)
        return res(global.errors.DB);

      if(existsUsername)
        errors.push(global.errors.USERNAME_EXISTS);
      
      // Email exists checking
      EmailExists(redis, payload.email, (errorResponseEmail, existsEmail) => {
        if(errorResponseEmail)  
          return res(global.errors.DB);
        
        if(existsEmail)
          errors.push(global.errors.EMAIL_EXISTS);

        // Phone exists checking
        PhoneExists(redis, payload.phone, (errorResponsePhone, existsPhone) => {
          if(errorResponseEmail)
            return res(global.errors.DB);
          
          if(existsPhone)
            errors.push(global.errors.PHONE_EXISTS);
            
          if(!existsUsername && !existsEmail && ! existsPhone){
            Bcrypt.genSalt(saltRounds)
            .then(salt => {
              Bcrypt.hash(payload.password, salt)
              .then(hash => {
                redis.incr(global.consts.REDIS_KEYS.USER_ID)
                .then(id => {
                  payload.password = hash;
                  payload.username = payload.username.toLowerCase();
                  payload.email = payload.email.toLowerCase();
                  redis.multi([
                    ['hmset', global.consts.REDIS_KEYS.USER + id, global.consts.REDIS_USER_FIELDS.USERNAME, payload.username, global.consts.REDIS_USER_FIELDS.FIRSTNAME, payload.firstName, global.consts.REDIS_USER_FIELDS.LASTNAME, payload.lastName, global.consts.REDIS_USER_FIELDS.IMAGE, payload.image], // each user detail
                    ['hmset', global.consts.REDIS_KEYS.USER_PRIMARY_USERNAME, payload.username, id], // connect username and id
                    ['hmset', global.consts.REDIS_KEYS.USER_PRIMARY_EMAIL, payload.email, id], // connect email and id
                    ['hmset', global.consts.REDIS_KEYS.USER_PRIMARY_PHONE, payload.phone, id], // connect phone and id
                    ['hset', global.consts.REDIS_KEYS.PASSWORDS, id, payload.password], // connect id and password
                    ['hset', global.consts.REDIS_KEYS.EMAILS, id, payload.email], // connect id and email
                    ['hset', global.consts.REDIS_KEYS.PHONES, id, payload.phone], // connect id and phone
                  ])
                  .exec((err, result) => {
                    if(err){
                      redis.decr(global.consts.REDIS_KEYS.USER_ID);
                      return res(global.errors.DB);
                    }
                    else{
                      // TODO: create token for user and send to client needed
                      return res(global.messages.SIGN_UP_SUCCESSFULLY);
                    }
                  });
                })
                .catch(incError => {
                  return res(global.errors.OHTERS);
                });
              })
              .catch(hashError => {
                return res(global.errors.OHTERS);
              });
            })
            .catch(bcryptError => {
              return res(global.errors.OHTERS);
            });
          }
          else{
            return res({code: global.errors.SIGN_UP.code, description: global.errors.SIGN_UP.description, errors: errors});
          }
        });
      });
    });
  }
  else{
    return res(global.errors.INVALID_REQUEST);
  }
};