
const port =  process.env.port ;
const http = require('http')
const app = require('./app'); 
const server = http.createServer(app);

server.listen(port);

