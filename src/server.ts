import application from '@/app/application';
import config from '@/config/config';

application.run(config.server.PORT);