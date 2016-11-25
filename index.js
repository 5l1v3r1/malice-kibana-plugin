import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],

    uiExports: {

      app: {
        title: 'Malice',
        description: 'Malice Kibana Plugin',
        icon: 'plugins/malice/icon.svg',
        main: 'plugins/malice/app'
      },


      hacks: [
        'plugins/malice/hack'
      ]

    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },


    init(server, options) {
      // Add server routes and initalize the plugin here
      exampleRoute(server);
    }


  });
};
