import Hapi from 'hapi';
import Good from 'good';
import APIPrivateRoutes from './api-private-routes';


export default function(){
  const apiPrivateServer = new Hapi.Server();

  apiPrivateServer.connection({
    host: global.consts.API_PRIVATE_CONFIGS.URL,
    port: global.consts.API_PRIVATE_CONFIGS.PORT,
  });
  apiPrivateServer.route(APIPrivateRoutes);
  
  apiPrivateServer.register([{
    register: Good,
    options: {
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            response: '*',
            log: '*'
          }]
        }, {
          module: 'good-console'
        }, 'stdout']
      }
    }
  }], (err) => {
    if (err) {
      throw err;
    }
    apiPrivateServer.start(err => {
      if (err) {
        throw err;
      }
      apiPrivateServer.log('apiPrivateServer running at: ' + apiPrivateServer.info.uri);
    });
  });
}