var currency = require('currency.js');
const request = require('supertest')('https://openexchangerates.org');

var fx = require('money');

module.exports = {
  /**
   * get net worth
   */
  getNetWorth: async (req) => {
    // const response = await request.get(`/api/latest.json?app_id=a120779d25204ea191111f0fe24959fb`);

    // fx.rates = response.body.rates;

    fx.base = 'USD';

    fx.rates = { 
        AED: 3.6732,
        AFN: 77.970945,
        ALL: 108.995046,
        AMD: 477.206327,
        ANG: 1.679017,
        AOA: 482.227,
        ARS: 59.499844,
        AUD: 1.429518,
        AWG: 1.8,
        AZN: 1.7025,
        BAM: 1.747915,
        BBD: 2,
        BDT: 84.61237,
        BGN: 1.74999,
        BHD: 0.37667,
        BIF: 1872.329177,
        BMD: 1,
        BND: 1.347754,
        BOB: 6.879217,
        BRL: 4.044006,
        BSD: 1,
        BTC: 0.000135879004,
        BTN: 71.125961,
        BWP: 10.564994,
        BYN: 2.095715,
        BZD: 2.008133,
        CAD: 1.30675,
        CDF: 1679.98153,
        CHF: 0.972484,
        CLF: 0.027141,
        CLP: 749.79962,
        CNH: 6.982513,
        CNY: 6.985,
        COP: 3272.539319,
        CRC: 566.159091,
        CUC: 1,
        CUP: 25.75,
        CVE: 99.13,
        CZK: 22.7157,
        DJF: 178,
        DKK: 6.66671,
        DOP: 52.741898,
        DZD: 119.238205,
        EGP: 15.9994,
        ERN: 14.999786,
        ETB: 31.626906,
        EUR: 0.892518,
        FJD: 2.1557,
        FKP: 0.762038,
        GBP: 0.762038,
        GEL: 2.865,
        GGP: 0.762038,
        GHS: 5.673712,
        GIP: 0.762038,
        GMD: 51.28,
        GNF: 9512.87124,
        GTQ: 7.676214,
        GYD: 207.283557,
        HKD: 7.78825,
        HNL: 24.540783,
        HRK: 6.6549,
        HTG: 94.717302,
        HUF: 294.9,
        IDR: 13936.8,
        ILS: 3.45833,
        IMP: 0.762038,
        INR: 71.357496,
        IQD: 1189.347124,
        IRR: 42105,
        ISK: 121.209963,
        JEP: 0.762038,
        JMD: 132.342366,
        JOD: 0.7093,
        JPY: 109.12136362,
        KES: 101.13,
        KGS: 69.59352,
        KHR: 4050.528913,
        KMF: 440.850253,
        KPW: 900,
        KRW: 1157.6875,
        KWD: 0.30345,
        KYD: 0.830243,
        KZT: 379.596912,
        LAK: 8842.768431,
        LBP: 1506.505583,
        LKR: 180.771299,
        LRD: 187.87506,
        LSL: 13.970508,
        LYD: 1.398186,
        MAD: 9.566558,
        MDL: 17.125698,
        MGA: 3667.237484,
        MKD: 54.953308,
        MMK: 1480.440101,
        MNT: 2697.760049,
        MOP: 7.989812,
        MRO: 357,
        MRU: 37.493632,
        MUR: 36.5,
        MVR: 15.45,
        MWK: 733.645241,
        MXN: 18.8308,
        MYR: 4.115501,
        MZN: 61.462995,
        NAD: 13.970508,
        NGN: 362.88,
        NIO: 33.615196,
        NOK: 8.799375,
        NPR: 113.821668,
        NZD: 1.489233,
        OMR: 0.384677,
        PAB: 1,
        PEN: 3.307118,
        PGK: 3.3979,
        PHP: 50.694876,
        PKR: 154.315659,
        PLN: 3.80475,
        PYG: 6461.369378,
        QAR: 3.627419,
        RON: 4.2813,
        RSD: 105.18,
        RUB: 62.084433,
        RWF: 944.573757,
        SAR: 3.75105,
        SBD: 8.303902,
        SCR: 13.69054,
        SDG: 45.15,
        SEK: 9.316502,
        SGD: 1.349582,
        SHP: 0.762038,
        SLL: 7488.043446,
        SOS: 576.446873,
        SRD: 7.458,
        SSP: 130.26,
        STD: 21560.79,
        STN: 22.2,
        SVC: 8.717994,
        SYP: 514.910169,
        SZL: 13.970508,
        THB: 30.145497,
        TJS: 9.659234,
        TMT: 3.51,
        TND: 2.8005,
        TOP: 2.289464,
        TRY: 5.9499,
        TTD: 6.7314,
        TWD: 30.081,
        TZS: 2289.411443,
        UAH: 23.601412,
        UGX: 3649.296625,
        USD: 1,
        UYU: 37.009526,
        UZS: 9480.677807,
        VEF: 248487.642241,
        VES: 33474.855,
        VND: 23054.43737,
        VUV: 115.4105,
        WST: 2.641999,
        XAF: 585.453734,
        XAG: 0.05577252,
        XAU: 0.00066002,
        XCD: 2.70255,
        XDR: 0.724555,
        XOF: 585.453734,
        XPD: 0.00052391,
        XPF: 106.505783,
        XPT: 0.00105164,
        YER: 250.349961,
        ZAR: 13.9959,
        ZMW: 13.823138,
        ZWL: 322.000001 
    };

    const from = req.query.currentSelectedCurrency;
    const to = req.query.nextSelectedCurrency;

    const cashInvestments = [...req.query.cashInvestments].map(JSON.parse);
    const longTermAssets = [...req.query.longTermAssets].map(JSON.parse);
    const shortTermLiabilities = [...req.query.shortTermLiabilities].map(JSON.parse);
    const longTermDebt = [...req.query.longTermDebt].map(JSON.parse);

    if (from !== to) {
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