
const port =  process.env.port || 3000 ;
const http = require('http')
const app = require('./app'); 
const server = http.createServer(app);

server.listen(port);

