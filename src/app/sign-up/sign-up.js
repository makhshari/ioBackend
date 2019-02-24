export default (axios, req, res) => {
  if(req.headers.app_token != global.consts.APP_CONFIGS.TOKEN_VALUE){
    return res(global.errors.TOKEN_MISMATCH);
  }
  axios.post(global.consts.API_PRIVATE_ROUTES.SIGN_UP, req.payload)
  .then(response => {
    return res(response.data);
  })
  .catch(error => {
    return res(error);
  });
};
