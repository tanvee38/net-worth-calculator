var currency = require('currency.js');
const request = require('supertest')('https://openexchangerates.org');

var fx = require('money');

module.exports = {
  /**
   * get net worth
   * @param {object} req
   * @return {object} responseData
   */
  getNetWorth: async (req) => {
    const from = req.query.currentSelectedCurrency;
    const to = req.query.nextSelectedCurrency;

    const cashInvestments = [...req.query.cashInvestments].map(JSON.parse);
    const longTermAssets = [...req.query.longTermAssets].map(JSON.parse);
    const shortTermLiabilities = [...req.query.shortTermLiabilities].map(JSON.parse);
    const longTermDebt = [...req.query.longTermDebt].map(JSON.parse);

    if (from !== to) {
        const response = await request.get(`/api/latest.json?app_id=a120779d25204ea191111f0fe24959fb`);

        fx.rates = response.body.rates;

        fx.base = 'USD';

        for (let item of cashInvestments) {
            item.value = currency(fx.convert(currency(item.value).value, {from: from, to: to})).format();
        }

        for (let item of longTermAssets) {
            item.value = currency(fx.convert(currency(item.value).value, {from: from, to: to})).format();
        }

        for (let item of shortTermLiabilities) {
            item.value = currency(fx.convert(currency(item.value).value, {from: from, to: to})).format();
            item.monthly_payment_value = currency(fx.convert(currency(item.monthly_payment_value).value, {from: from, to: to})).format();
        }

        for (let item of longTermDebt) {
            item.value = currency(fx.convert(currency(item.value).value, {from: from, to: to})).format();
            item.monthly_payment_value = currency(fx.convert(currency(item.monthly_payment_value).value, {from: from, to: to})).format();
        }
    }

    let totalAssets = 0;
    let totalLiabilities = 0;

    for (let item of cashInvestments) {
        totalAssets = currency(totalAssets).add(item.value);
    }

    for (let item of longTermAssets) {
        totalAssets = currency(totalAssets).add(item.value);
    }

    for (let item of shortTermLiabilities) {
        totalLiabilities = currency(totalLiabilities).add(item.value);
    }

    for (let item of longTermDebt) {
        totalLiabilities = currency(totalLiabilities).add(item.value);
    }

    const networth = currency(totalAssets).subtract(totalLiabilities);

    const responseData = {
        cashInvestments: cashInvestments,
        longTermAssets: longTermAssets,
        shortTermLiabilities: shortTermLiabilities,
        longTermDebt: longTermDebt,
        totalAssets: totalAssets,
        totalLiabilities: totalLiabilities,
        networth: networth,
    }

    return responseData;
  }
}; 