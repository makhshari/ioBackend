import IoRedis from 'ioredis';
import SignUpModule from './sign-up/sign-up';
import {VerifyEmailModule} from './sign-up/verify-email';
import {VerifyPhoneModule} from './sign-up/verify-phone';
import {VerifyUsernameModule} from './sign-up/verify-username';


const redis = new IoRedis(global.consts.REDIS_CONFIGS.PORT, global.consts.REDIS_CONFIGS.URL);

let SignUp = (req, res) => {
  SignUpModule(redis, req, res);
};

let VerifyEmail = (req, res) => {
  VerifyEmailModule(redis, req, res);
};

let VerifyPhone = (req, res) => {
  VerifyPhoneModule(redis, req, res);
};

let VerifyUsername = (req, res) => {
  VerifyUsernameModule(redis, req, res);
};

export {SignUp, VerifyEmail, VerifyPhone, VerifyUsername};
