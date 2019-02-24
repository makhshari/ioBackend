import Hapi from 'hapi';
import Good from 'good';
import Yar from 'yar';
import AppRoutes from './app-routes';


export default function(){
  const appServer = new Hapi.Server();
  
  appServer.connection({
    host: global.consts.APP_CONFIGS.URL,
    port: global.consts.APP_CONFIGS.PORT,
  });
  appServer.route(AppRoutes);
  
  appServer.register([{
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
  },
  {
    register: Yar,
    options: {
      storeBlank: false,
      cookieOptions: {
        password: 'the-password-must-be-at-least-32-characters-long',
        isSecure: false
      }
    }
  }], (err) => {
    if (err) {
      throw err;
    }
    appServer.start(err => {
      if (err) {
        throw err;
      }
      appServer.log('appServer running at: ' + appServer.info.uri);
    });
  });
}