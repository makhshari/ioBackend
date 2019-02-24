export default (axios, req, res) => {
  if(req.headers.app_token != global.consts.APP_CONFIGS.TOKEN_VALUE){
    return res(global.errors.TOKEN_MISMATCH);
  }
  axios.post(global.consts.API_PRIVATE_ROUTES.VERIFY_EMAIL, req.payload)
  .then(response => {
    // TODO: send email to user remained
    return res(response.data);
  })
  .catch(error => {
    return res(error);
  });
};
