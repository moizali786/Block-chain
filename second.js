const express = require('express')
const app = express();
const port = 3000;
    
var ifpage = require('./pages/info');
var abpage = require('./pages/about');
var lgpage = require('./pages/login');
var hpage  = require('./pages/home');
var ctpage = require('./pages/contact');
     
app.use('/',ifpage);
app.use('/',abpage);
app.use('/',lgpage);
app.use('/',hpage);
app.use('/',ctpage);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    });