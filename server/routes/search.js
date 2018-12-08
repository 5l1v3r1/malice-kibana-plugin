export default function (server) {
  server.route({
    path: '/api/malice/search',
    method: 'GET',
    handler(req, reply) {
      console.log(req.headers);
      server.plugins.elasticsearch
        .getCluster('data')
        .callWithRequest(req, 'search', {
          index: 'malice',
          type: 'samples',
          body: {
            query: {
              match_all: {}
            }
          }
        })
        .then(function (result) {
          console.log(result);
          reply(null, result);
        })
        .catch(function (ex) {
          reply(ex);
        });
    }
  });
}
