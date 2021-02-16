var express = require('express');
// var bodyParser = require('body-parser');
// var cors = require('cors');
// const userRoutes = require('./api/controller/userController')
var app = express();
app.use(express.json());
app.get('/',(req,res)=>{res.send('welcome ajay')})
const port = process.env.PORT || '5000';
app.listen(port,()=>console.log('server',port));

module.exports = app;
 
