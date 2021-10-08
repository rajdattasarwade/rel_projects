const http = require('http');
const routes = require('./routes');
console.log(routes.someText);
const createServer = http.createServer(routes.handler);

createServer.listen(3000);