import {SignUp, VerifyEmail, VerifyPhone, CheckCode, VerifyUsername} from './app-route-controller';


// All server routes in here. Routes path are in the consts.js file, Handler functions just call a server method
const payloadConfig = {
  output: 'data',
  parse:true
};

const routes = [
  {
    path: global.consts.APP_ROUTES.SIGN_UP,
    method: 'POST',
    config: {
      handler: SignUp,
      payload: payloadConfig
    }
  },
  {
    path: global.consts.APP_ROUTES.VERIFY_EMAIL,
    method: 'POST',
    config: {
      handler: VerifyEmail,
      payload: payloadConfig
    }
  },
  {
    path: global.consts.APP_ROUTES.VERIFY_PHONE,
    method: 'POST',
    config: {
      handler: VerifyPhone,
      payload: payloadConfig
    }
  },
  {
    path: global.consts.APP_ROUTES.CHECK_CODE,
    method: 'POST',
    config: {
      handler: CheckCode,
      payload: payloadConfig
    }
  },
  {
    path: global.consts.APP_ROUTES.VERIFY_USERNAME,
    method: 'POST',
    config: {
      handler: VerifyUsername,
      payload: payloadConfig
    }
  }
];

export default routes;
