const path = require('path');

const server = require(path.resolve('./server.js'));

const request = require('supertest').agent(server.listen());
const {test} = require('ava');

const data = {
  cashInvestments: [
    {id: 1, name: 'Chequing', value: 100},
    {id: 2, name: 'Savings for Taxes', value: 100},
    {id: 3, name: 'Rainy Day Fund', value: 100},
    {id: 4, name: 'Savings for Fun', value: 100},
    {id: 5, name: 'Savings for Travel', value: 100},
    {id: 6, name: 'Savings for Personal Development', value: 100},
    {id: 7, name: 'Investment 1', value: 100},
    {id: 8, name: 'Investment 2', value: 100},
    {id: 9, name: 'Investment 3', value: 100},
    {id: 10, name: 'Investment 4', value: 100},
    {id: 11, name: 'Investment 5', value: 100}
  ],
  longTermAssets: [
    {id: 1, name: 'Primary Home', value: 100},
    {id: 2, name: 'Second Home', value: 100},
    {id: 3, name: 'Other', value: 0},
  ],
  shortTermLiabilities: [
    {id: 1, name: 'Credit Card 1', value: 100, monthly_payment_value: 200},
    {id: 2, name: 'Credit Card 2', value: 100, monthly_payment_value: 150},
    {id: 3, name: 'Others', value: 100, monthly_payment_value: 0}
  ],
  longTermDebt: [
    {id: 1, name: 'Mortgage 1', value: 100, monthly_payment_value: 2000},
    {id: 2, name: 'Mortgage 2', value: 100, monthly_payment_value: 3500},
    {id: 3, name: 'Line of Credit', value: 100, monthly_payment_value: 500},
    {id: 4, name: 'Investment Loan', value: 100, monthly_payment_value: 70},
    {id: 5, name: 'Student Loan', value: 100, monthly_payment_value: 0},
    {id: 6, name: 'Car Loan', value: 100, monthly_payment_value: 0}
  ],
  currentSelection: 'CAD'  
}

let req = {
  cashInvestments: [...data.cashInvestments].map(JSON.stringify),
  longTermAssets: [...data.longTermAssets].map(JSON.stringify),
  shortTermLiabilities: [...data.shortTermLiabilities].map(JSON.stringify),
  longTermDebt: [...data.longTermDebt].map(JSON.stringify),
  currentSelectedCurrency: data.currentSelection,
  nextSelectedCurrency: data.currentSelection
};

test.serial('Get calculated results', async (t) => {
  const res = await request.get(
    `/net-worth-calculator`
  ).query(req);

  t.is(res.body.totalAssets, 1300);
  t.is(res.body.totalLiabilities, 900);
  t.is(res.body.networth, 400);
});

test.serial('Convert calculated results from CAD to USD', async (t) => {
  req.nextSelectedCurrency = 'USD';

  const res = await request.get(
    `/net-worth-calculator`
  ).query(req);

  t.is(res.body.totalAssets, 994.89);
  t.is(res.body.totalLiabilities, 688.77);
  t.is(res.body.networth, 306.12);
});
