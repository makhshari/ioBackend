// All global errors constants are here
global.errors = {

  // Global errors 600 - 
  TOKEN_MISMATCH:{
    code: 600,
    description: 'token mismatch'
  },
  DB: {
    code: 601,
    description : 'some database error', // DB errors
  },
  OTHERS: {
    code: 602,
    description : 'other error', // BCrypt, yar or other library errors
  },
  INVALID_REQUEST: {
    code: 603,
    description : 'invalid fields', // Not valid inputs, not validate
  },
  // ------------------------------------------------------------------------
  
  // Sign up errors 610
  SIGN_UP: {
    code: 610,
    description: 'some sign up errors'
  },
  EMAIL_EXISTS :{
    code : 611,
    description : 'email exist error',
  },
  USERNAME_EXISTS :{
    code : 612,
    description : 'username exist error',
  },
  PHONE_EXISTS :{
    code : 613,
    description : 'phone exist error',
  },
  PHONE_VERIFY_FAILED: {
    code: 614,
    description: 'phone verify failed'
  },
  SEND_SMS: {
    code: 615,
    description: 'send sms error'
  },
  // ------------------------------------------------------------------------
};
