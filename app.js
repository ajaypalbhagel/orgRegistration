var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const userRoutes = require('./api/controller/userController')
var app = express();
var fs = require('fs');


const mongoose = require('mongoose'); 


var app = express();

mongoose.connect('mongodb+srv://ajayp:ajay123!@cluster0.aksrw.mongodb.net/test',
{
    useUnifiedTopology: true ,
    useNewUrlParser : true
})

app.use('/uploads',express.static('uploads'))

//use body parser for parsing req body
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//enabling cors
app.use((req,res,next)=>
{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Accept, Content-Type, Authorization');

    if(req.method==='OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','PUT, POST , PATCH , DELETE')
        return res.status(200).json({
        })
    }

    next();

});

app.use(cors());
app.use('/user',userRoutes)

app.get('/home',(req,res)=>{
    var htmlText = fs.readFileSync('./home.html', 'utf8');
    res.send(htmlText);
})
app.get('/',(req,res)=>{
    var htmlText = fs.readFileSync('./index.html', 'utf8');
    res.send(htmlText);
})



app.use((req,res,next) => {
    const error = new Error("Not Found");
    error.status=404
    next(error)

})

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        error:
            {
                message: error.message
            }
    });

});



module.exports = app;

