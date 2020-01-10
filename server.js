var express = require('express');    
var logger = require('morgan');
var netWorthCalculator = require('./routes/netWorthCalculator.routes');

var app = express();  

app.use(logger('dev'));

app.use('/net-worth-calculator', netWorthCalculator);  

app.listen(8000, function () {
  console.log('Web server listening on port 8000')
})  
module.exports = app; 