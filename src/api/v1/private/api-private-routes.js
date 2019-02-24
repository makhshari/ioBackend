import {SignUp, VerifyEmail, VerifyPhone, VerifyUsername} from './api-private-route-controller';


// All API routes in here. Routes path are in the consts.js file, Handler functions just call a api method
const payloadConfig = {
  output: 'data',
  parse: true
};

const routes = [
  {
    path: global.consts.API_PRIVATE_ROUTES.SIGN_UP,
    method: 'POST',
    config: {
      handler: SignUp,
      payload: payloadConfig
    }
  },
  {
    path: global.consts.API_PRIVATE_ROUTES.VERIFY_EMAIL,
    method: 'POST',
    config: {
      handler: VerifyEmail,
      payload: payloadConfig
    }
  },
  {
    path: global.consts.API_PRIVATE_ROUTES.VERIFY_PHONE,
    method: 'POST',
    config: {
      handler: VerifyPhone,
      payload: payloadConfig
    }
  },
  {
    path: global.consts.API_PRIVATE_ROUTES.VERIFY_USERNAME,
    method: 'POST',
    config: {
      handler: VerifyUsername,
      payload: payloadConfig
    }
  }
];

export default routes;
