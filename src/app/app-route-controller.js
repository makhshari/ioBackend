import Axios from './axios/axios';
import SignUpModule from './sign-up/sign-up';
import VerifyEmailModule from './sign-up/verify-email';
import VerifyPhoneModule from './sign-up/verify-phone';
import CheckCodeModule from './sign-up/check-code';
import VerifyUsernameModule from './sign-up/verify-username';


// In here we have to use 'REST API' method to our API, so we import our modules and in that we request to API in that modules
let SignUp = (req, res) => {
  SignUpModule(Axios, req, res);
};

let VerifyEmail = (req, res) => {
  VerifyEmailModule(Axios, req, res);
};

let VerifyPhone = (req, res) => {
  VerifyPhoneModule(Axios, req, res);
};

let CheckCode = (req, res) => {
  CheckCodeModule(Axios, req, res);
};

let VerifyUsername = (req, res) => {
  VerifyUsernameModule(Axios, req, res);
};

export {SignUp, VerifyEmail, VerifyPhone, CheckCode, VerifyUsername};
