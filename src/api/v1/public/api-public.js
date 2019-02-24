import Hapi from 'hapi';
import Good from 'good';
import APIPublicRoutes from './api-public-routes';


export default function(){
  const apiPublicServer = new Hapi.Server();

  apiPublicServer.connection({
    host: global.consts.API_PUBLIC_CONFIGS.URL,
    port: global.consts.API_PUBLIC_CONFIGS.PORT,
  });
  apiPublicServer.route(APIPublicRoutes);
  
  apiPublicServer.register([{
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
    apiPublicServer.start(err => {
      if (err) {
        throw err;
      }
      apiPublicServer.log('apiPublicServer running at: ' + apiPublicServer.info.uri);
    });
  });
}