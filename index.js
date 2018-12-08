import searchRoute from './server/routes/search';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'malice',
    uiExports: {
      app: {
        title: 'Malice',
        description: 'Malice Kibana Plugin',
        icon: 'plugins/malice/icon.svg',
        main: 'plugins/malice/app'
      },
      hacks: ['plugins/malice/hack'],
      styleSheetPaths: require('path').resolve(__dirname, 'public/app.scss')
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true)
      }).default();
    },

    init(server, options) {
      // Add server routes and initialize the plugin here
      server.log(['status', 'info', 'malice'], 'Malice Initializing...');
      searchRoute(server);
    }
  });
}
