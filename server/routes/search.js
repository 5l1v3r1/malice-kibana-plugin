import Boom from "boom";

const ROOT = "/api/malice";
const defaultErrorHandler = err => {
  console.error(err.stack);
  throw Boom.boomify(err, { statusCode: 400 });
};

export default function(server) {
  // SEARCH
  server.route({
    path: `${ROOT}/search`,
    method: "GET",
    handler(req, reply) {
      // console.log('req', req);
      const { query } = req.query;
      // console.log('query', query);
      // console.log('typeof query', typeof query);
      server.plugins.elasticsearch
        .getCluster("data")
        .callWithRequest(req, "search", {
          index: "malice",
          type: "samples",
          q: query || "*"
        })
        .then(function(result) {
          reply(null, result);
        })
        .catch(defaultErrorHandler);
    }
  });
  // GET
  server.route({
    path: `${ROOT}/get`,
    method: "GET",
    handler(req, reply) {
      // console.log('req', req);
      const { id } = req.query;
      // console.log('id', id);
      // console.log('typeof id', typeof id);
      server.plugins.elasticsearch
        .getCluster("data")
        .callWithRequest(req, "get", {
          id: id || 1,
          index: "malice",
          type: "samples",
          ignore: [404]
        })
        .then(function(result) {
          reply(null, result);
        })
        .catch(defaultErrorHandler);
    }
  });
}
