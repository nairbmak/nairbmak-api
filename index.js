var http = require('http');
var fs = require('fs');
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var propertiesReader = require('properties-reader');


/**
 * Watch env and config
 */
const env = process.env.NODE_ENV || 'development';
console.log('*** Environment:', env);


/**
 * Config
 */
const config = require('./config')[env];
global.config = config;

/**
 * Status code and message error
 */
var properties = propertiesReader('./properties.file');
global.property = function (code) { return JSON.parse(properties.get(code)); }


/**
 * Creating express server
 */
var app = express();
var server = http.createServer(app);


/**
 * Middlewares
 */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * Router
 */

// Main APIs
var api = require('./routes/api');
app.use('/', api);

// Error handler
var { uncatchableAPI, errorHandler } = require('./routes/error');
app.use(uncatchableAPI);
app.use(errorHandler);


/**
 * Start server
 */

server.listen(config.PORT);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  var bind = typeof config.server.PORT === 'string' ? 'Pipe ' + config.server.PORT : 'Port ' + config.server.PORT;
  switch (error.code) {
    case 'EACCES':
      console.log(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('*** Listening on ' + bind);
}