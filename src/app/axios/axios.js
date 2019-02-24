import Axios from 'axios';


export default Axios.create({
  baseURL: global.consts.APPLICATION_PROTOCOL + '://' + global.consts.API_PRIVATE_CONFIGS.URL + ':' + global.consts.API_PRIVATE_CONFIGS.PORT,
  headers: {
    api_token: global.consts.API_PRIVATE_CONFIGS.TOKEN_VALUE
  }
});
