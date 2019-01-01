export default function (server) {
  server.route({
    path: '/api/malice/search',
    method: 'GET',
    handler(req, reply) {
      // console.log('req', req);
      const { query } = req.query;
      console.log('query', query);
      console.log('typeof query', typeof query);
      server.plugins.elasticsearch
        .getCluster('data')
        .callWithRequest(req, 'search', {
          index: 'malice',
          type: 'samples',
          q: query || '*'
        })
        .then(function (result) {
          reply(null, result);
        })
        .catch(function (ex) {
          reply(ex);
        });
    }
  });
}
