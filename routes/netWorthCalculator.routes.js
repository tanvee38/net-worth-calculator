const express = require('express');  
const router = express.Router();  
const path = require('path');

const netWorthCalculatorService = require(path.resolve(
  './services/netWorthCalculator.service.js'
));

router.get('/', async(req, res) => {
  const responseData = await netWorthCalculatorService.getNetWorth(req);

  res.send(responseData)}
);

module.exports = router; 