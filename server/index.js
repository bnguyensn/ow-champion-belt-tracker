/**
 * Our server only responds to our web application. This is handled via CORS
 * (only requests from our web application's origin is allowed).
 * */

const log = require('./lib/log');
const config = require('./serverConfig');
const fastify = require('fastify/fastify')();

// ********** Plugins ********** //

fastify.register(require('fastify-sensible'));
fastify.register(require('fastify-helmet'));
fastify.register(require('fastify-url-data'));
fastify.register(require('fastify-cors'), {
  origin: config.allowedOrigins,
  methods: 'GET',
});

// ********** Hooks ********** //

fastify.addHook('preHandler', (req, res, next) => {
  try {
    const urlData = req.urlData();
    log.info(`Received request for ${urlData.path}`);
    next();
  } catch (err) {
    next(err);
  }
});

fastify.addHook('onResponse', (req, res, next) => {
  try {
    const urlData = req.urlData();
    log.success(`Sent response for ${urlData.path}`);
    next();
  } catch (err) {
    next(err);
  }
});

// ********** Routes ********** //

const getChampion = require('./routes/getChampion');

fastify.get('/get-champion', ...getChampion());

// ********** Error handling ********** //

fastify.setErrorHandler((err, req, res) => {
  if (req.params['*'] !== 'favicon.ico') {
    log.error(`Server error for path ${req.params['*']}: ${err.message}`);
  }
  res.status(500).send(`Server error: ${err.message}`);
});

// ********** Start the server 🏁 ********** //

async function start() {
  try {
    await fastify.listen(config.port);
    log.info(`Server listening on port ${fastify.server.address().port}`);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
}

start();
