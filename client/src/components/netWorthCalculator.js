import React, { Component } from 'react';
import axios from 'axios';
import './netWorthCalculator.css';

import currency from '../../node_modules/currency.js';

class NetworthCalculator extends Component {
  constructor() {
    super();
    this.state = {
      cashInvestments: [
        {id: 1, name: 'Chequing', value: '2000.00'},
        {id: 2, name: 'Savings for Taxes', value: '4000.00'},
        {id: 3, name: 'Rainy Day Fund', value: '506.00'},
        {id: 4, name: 'Savings for Fun', value: '5000.00'},
        {id: 5, name: 'Savings for Travel', value: '400.00'},
        {id: 6, name: 'Savings for Personal Development', value: '200.00'},
        {id: 7, name: 'Investment 1', value: '5000.00'},
        {id: 8, name: 'Investment 2', value: '60000.00'},
        {id: 9, name: 'Investment 3', value: '30000.00'},
        {id: 10, name: 'Investment 4', value: '50000.00'},
        {id: 11, name: 'Investment 5', value: '24000.00'}
      ],
      longTermAssets: [
        {id: 1, name: 'Primary Home', value: '455000.00'},
        {id: 2, name: 'Second Home', value: '1564321.00'},
        {id: 3, name: 'Other', value: '0.00'},
      ],
      shortTermLiabilities: [
        {id: 1, name: 'Credit Card 1', value: '4342.00', monthly_payment_value: '200.00'},
        {id: 2, name: 'Credit Card 2', value: '322.00', monthly_payment_value: '150.00'},
        {id: 3, name: 'Others', value: '0.00', monthly_payment_value: '0.00'}
      ],
      longTermDebt: [
        {id: 1, name: 'Mortgage 1', value: '250999.00', monthly_payment_value: '2000.00'},
        {id: 2, name: 'Mortgage 2', value: '632634.00', monthly_payment_value: '3500.00'},
        {id: 3, name: 'Line of Credit', value: '10000.00', monthly_payment_value: '500.00'},
        {id: 4, name: 'Investment Loan', value: '10000.00', monthly_payment_value: '70.00'},
        {id: 5, name: 'Student Loan', value: '0.00', monthly_payment_value: '0.00'},
        {id: 6, name: 'Car Loan', value: '0.00', monthly_payment_value: '0.00'}
      ],
      totalAssets: '',
      totalLiabilities: '',
      networth: '',
      currentSelection: 'CAD',
      currencySign: {
        'CAD': {sign: '$'},
        'BDT': {sign: '৳'},
        'USD': {sign: '$'},
        'EUR' : {sign: '€'},
        'GBP': {sign: '£'},
        'INR': {sign: '₹'},
        'MXN': {sign: '$'},
        'BRL' : {sign: 'R$'},
        'SGD': {sign: '$'},
        'JPY': {sign: '¥'},
      },
      isValid : true
    };
  }

  componentDidMount() {
    this.getNetWorth();
  }

  /**
   * Validate
   * @param {string} value
   * @return {boolean}
   */
  validate(value) {
    value = parseFloat(value.replace(/,/g, ""))
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let isValid = true;

    if (value < 0) {
      isValid = false;
    }

    if (value === 'NaN') {
      isValid = false;
    }

    return isValid;
  }

  /**
   * Get net worth
   */
  getNetWorth() {
    const currencyType = document.getElementById('currency-dropdown').value;

    const req = {
      cashInvestments: this.state.cashInvestments,
      longTermAssets: this.state.longTermAssets,
      shortTermLiabilities: this.state.shortTermLiabilities,
      longTermDebt: this.state.longTermDebt,
      currentSelectedCurrency: this.state.currentSelection,
      nextSelectedCurrency: currencyType
    }

    axios.get('/net-worth-calculator', {
      params: req
    })
    .then(res => {
      const cashInvestments = res.data.cashInvestments;
      const longTermAssets = res.data.longTermAssets;
      const shortTermLiabilities = res.data.shortTermLiabilities;
      const longTermDebt = res.data.longTermDebt;
      const totalAssets = res.data.totalAssets;
      const totalLiabilities = res.data.totalLiabilities;
      const networth = res.data.networth;

      this.setState({cashInvestments});
      this.setState({longTermAssets});
      this.setState({shortTermLiabilities});
      this.setState({longTermDebt});
      this.setState({totalAssets});
      this.setState({totalLiabilities});
      this.setState({networth});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /**
   * Handle input
   * @param {object} event
   */
  _handleInput = (event) => {
    let balancesheetItems = [...this.state[event.target.name]];
    
    let item = balancesheetItems.find(el => el.name === event.target.id);

    const index = balancesheetItems.findIndex(el => el.id === event.target.id);

    item.value = event.target.value;

    balancesheetItems[index] = item;
     
    this.setState({balancesheetItems});
  }

  /**
   * Handle submit
   * @param {object} event
   */
  _handleSubmit = (event) => {
    let balancesheetItems = [...this.state[event.target.name]];
    
    let item = balancesheetItems.find(el => el.name === event.target.id);

    const index = balancesheetItems.findIndex(el => el.id === event.target.id);

    item.value = currency(event.target.value).format();

    balancesheetItems[index] = item;
     
    this.setState({balancesheetItems});

    const isValid = this.validate(item.value, event.target.id);

    this.state.isValid = isValid;

    this.setState({isValid: isValid});

    if (this.state.isValid) {
      this.getNetWorth();
    }
  }

  /**
   * Handle select
   */
  _handleSelect = () => {
    const currentSelection = document.getElementById('currency-dropdown').value;

    this.setState({currentSelection});

    if (this.state.isValid) {
      this.getNetWorth();
    }
  }

  

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th><h2>Tracking your Networth</h2></th>
              <th></th>
              <th></th>
            </tr>
            <tr className="header_line">
              <th></th>
              <th></th>
              <th>
                Select currency: <select disabled={!this.state.isValid} id="currency-dropdown" onChange={this._handleSelect}>
                  <option value="CAD">CAD &#36;</option>
                  <option value="BDT">BDT &#2547;</option>
                  <option value="USD">USD &#36;</option>
                  <option value="EUR">EUR &#8364;</option>
                  <option value="GBP">GBP &#163;</option>
                  <option value="INR">INR &#8377;</option>
                  <option value="MXN">MXN &#36;</option>
                  <option value="BRL">BRL &#82;&#36;</option>
                  <option value="SGD">SGD &#36;</option>
                  <option value="JPY">JPY &#165;</option>
                </select>
              </th>
            </tr>
            <tr className="header header_line">
              <th>Net Worth</th>
              <th></th>
              <th>{this.state.currencySign[this.state.currentSelection].sign} {currency(this.state.networth).format()}</th>
            </tr>
            <tr className="header header_line">
              <th>Assets</th>
              <th></th>
              <th></th>
            </tr>
            <tr className="header_line">
              <th>Cash and Investments</th>
              <th></th>
              <th></th>
            </tr>

            {this.state.cashInvestments.map(item => 
              <tr key={item.id}>
                <td>{item.name}</td>
                <td></td>
                <td><span className="value">{this.state.currencySign[this.state.currentSelection].sign} </span>
                <input 
                  type="text"
                  className={item.value < 0 ? "error value" : "value"} 
                  name="cashInvestments" 
                  id={item.name} 
                  pattern="[0-9]*$" 
                  value={currency(item.value).format()} 
                  onChange={this._handleInput} 
                  onBlur={this._handleSubmit}
                ></input>
                </td>
              </tr>
            )}

            <tr className="header_line"> 
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr className="header_line">
              <th>Long Term Assets</th>
              <th></th>
              <th></th>
            </tr>

            {this.state.longTermAssets.map(item => 
              <tr key={item.id}>
                <td>{item.name}</td>
                <td></td>
                <td><span className="value">{this.state.currencySign[this.state.currentSelection].sign} </span>
                  <input 
                    type="text"
                    className={item.value < 0 ? "error value" : "value"} 
                    name="longTermAssets" 
                    id={item.name} 
                    pattern="[0-9]*$" 
                    value={currency(item.value).format()} 
                    onChange={this._handleInput} 
                    onBlur={this._handleSubmit}
                  ></input>
                </td>
              </tr>
            )}

            <tr className="header_line"> 
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr className="header header_double_line">
              <td>Total Assets</td>
              <td></td>
              <td>{this.state.currencySign[this.state.currentSelection].sign} {currency(this.state.totalAssets).format()}</td>
            </tr>

            <tr className="header header_line">
              <th>Liabilities</th>
              <th></th>
              <th></th>
            </tr>

            <tr className="header_line">
              <th>Short Term Liabilities</th>
              <th>Monthly Payment</th>
              <th></th>
            </tr>

            {this.state.shortTermLiabilities.map(item => 
              <tr key={item.id}>
                <td>{item.name}</td>
                <td><span>{this.state.currencySign[this.state.currentSelection].sign} </span>{item.monthly_payment_value}</td>
                <td><span className="value">{this.state.currencySign[this.state.currentSelection].sign} </span>
                <input 
                    type="text"
                    className={item.value < 0 ? "error value" : "value"} 
                    name="shortTermLiabilities" 
                    id={item.name} 
                    pattern="[0-9]*$" 
                    value={currency(item.value).format()} 
                    onChange={this._handleInput} 
                    onBlur={this._handleSubmit}
                  ></input>
                </td>
              </tr>
            )}

            <tr className="header_line"> 
              <td></td>
              <td></td>
              <td></td>
            </tr>
          
            <tr className="header_line">
              <th>Long Term Debt</th>
              <th></th>
              <th></th>
            </tr>

            {this.state.longTermDebt.map(item => 
              <tr key={item.id}>
                <td>{item.name}</td>
                <td><span>{this.state.currencySign[this.state.currentSelection].sign} </span>{item.monthly_payment_value}</td>
                <td><span className="value">{this.state.currencySign[this.state.currentSelection].sign} </span>
                <input 
                    type="text"
                    className={item.value < 0 ? "error value" : "value"} 
                    name="longTermDebt" 
                    id={item.name} 
                    pattern="[0-9]*$" 
                    value={currency(item.value).format()} 
                    onChange={this._handleInput} 
                    onBlur={this._handleSubmit}
                  ></input>
                </td>
              </tr>
            )}

            <tr className="header_line"> 
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr className="header header_double_line">
              <td>Total Liabilities</td>
              <td></td>
              <td>{this.state.currencySign[this.state.currentSelection].sign} {currency(this.state.totalLiabilities).format()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default NetworthCalculator;
