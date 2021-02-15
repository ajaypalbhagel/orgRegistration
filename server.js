
const port =  3000;
const http = require('http')
const app = require('./app'); 
const server = http.createServer(app);




// console.log(server)
server.listen(port);
