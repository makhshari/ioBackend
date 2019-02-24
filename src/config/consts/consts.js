// All global constants are here

/*
  Sessions: [
    'hashed_sms': {code: 1234}
  ]
*/
global.consts = {
  APPLICATION_PROTOCOL: 'http',
  APPLICATION_NAME: 'myApp',

  KAVENEGAR_CONFIG:{
    API_KEY: '457A6D41346F31466E562F776D496251497A5A7833673D3D',
    SENDER: '100065995',
    MESSAGE: 'با تشکر از عضویت شما\n کد عضویت شما:\n'
  },

  APP_CONFIGS:{
    URL: 'localhost',
    PORT: 8000,
    // app_token
    TOKEN_VALUE: 'eyJhbGciOiJIUzI1NiIsInR5cCI6InZlbm1vaXItYXBwdG9rZW4ifQ.eyJhZG1pbiI6ImRhbnRlMjUtYXBwdG9rZW4ifQ.bDNRG2R8dovP9B84UZYD63RLIOpfCJ88_VIyqYa5Tm0',
  },
  APP_ROUTES: {
    SIGN_UP: '/app/sign-up',
    VERIFY_EMAIL: '/app/sign-up/verify-email',
    VERIFY_PHONE: '/app/sign-up/verify-phone',
    VERIFY_USERNAME: '/app/sign-up/verify-username',
    CHECK_CODE: '/app/sign-up/check-code'
  },

  API_PRIVATE_CONFIGS: {
    URL: 'localhost',
    PORT: 8001,
    // api_token
    TOKEN_VALUE: 'eyJhbGciOiJIUzI1NiIsIm91ci1oZWFkIjoib3VyLXZlbm1vLWFwaS10b2tlbiJ9.eyJvdXItbmV4dC1hZG1pbiI6ImFsaXMtYXBpLXRva2VuIn0.PnZgiIOAaio7D7dCbYhquNdCGhnHX7cuGxvbqwR0lig',
  },
  API_PRIVATE_ROUTES: {
    SIGN_UP: '/api/v1/private/sign-up/sign-up',
    VERIFY_EMAIL: '/api/v1/private/sign-up/verify-email',
    VERIFY_PHONE: '/api/v1/private/sign-up/verify-phone',
    VERIFY_USERNAME: '/api/v1/private/sign-up/verify-username',
  },

  API_PUBLIC_CONFIGS: {
    URL: 'localhost',
    PORT: 8002,
    TOKEN_VALUE: 'eyJhbGciOiJIUzI1NiIsIm91ci1oZWFkIjoib3VyLXZlbm1vLWFwaS10b2tlbiJ9.eyJvdXItbmV4dC1hZG1pbiI6ImFsaXMtYXBpLXRva2VuIn0.PnZgiIOAaio7D7dCbYhquNdCGhnHX7cuGxvbqwR0lig'
  },

  API_PUBLIC_ROUTES: {
    
  },

  REDIS_CONFIGS: {
    PORT: 6379,
    URL: 'localhost',
  },
  REDIS_USER_FIELDS: {
    USERNAME: 'username',
    FIRSTNAME: 'firstName',
    LASTNAME: 'lastName',
    IMAGE: 'image'
  },
  REDIS_KEYS: {
    USER_ID: 'user-id',
    USER: 'user:',
    USER_PRIMARY_USERNAME: 'users-primary-username',
    USER_PRIMARY_EMAIL: 'users-primary-email',
    USER_PRIMARY_PHONE: 'users-primary-phone',
    PASSWORDS: 'passwords',
    EMAILS: 'emails',
    PHONES: 'phones',
  },
};