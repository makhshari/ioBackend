import './config/consts/consts';
import './config/consts/errors';
import './config/consts/messages';

import AppServer from './app/app';
import APIPrivateServer from './api/v1/private/api-private';
import APIPublicServer from './api/v1/public/api-public';


APIPrivateServer();

APIPublicServer();

AppServer();
