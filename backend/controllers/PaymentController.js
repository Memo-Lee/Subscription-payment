const Craftgate = require("@craftgate/craftgate");
const { default: Currency } = require("@craftgate/craftgate/dist/model/Currency.js");
const craftgate = require('../client/account.js');
const Payment = require('../models/Payment');

function createDate(days, hours, minutes, seconds) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  return date;
}
// okey
exports.createPayment = async (req, res) => {

// ***** 1. YÖNTEM MONGODB-Req.Body (True); *****

  /*
      Required values;

      {
        "price": 100.0,
        "paidPrice": 100.0,
        "walletPrice": 0.0,
        "installment": 1,
        "card": {
          "cardHolderName": "Zynga",
          "cardNumber": "5258640000000001",
          "expireYear": "2044",
          "expireMonth": "07",
          "cvc": "000"
        },
        "items": [
          {
            "name": "Pro",
            "price": 100.0 
          }
        ]
      }

   */

    try {
        var currency = {currency:Craftgate.Model.Currency.TRY};
        var input = req.body;
        var returnTarget = Object.assign(currency,input);

        craftgate
        .payment()
        .createPayment(returnTarget)
        .then(async function (result) {
            const payment = new Payment(
                {
                  id:result.id,
                  items:[
                    {
                      name:result.paymentTransactions[0].name, // item name
                      price:result.paymentTransactions[0].price, //item price
                    }
                  ],
                  price:result.price, //price
                  paidPrice: result.paidPrice, //paidPrice
                  walletPrice : result.walletPrice, //walletPrice
                  installment: result.installment, //installment
                  currency:result.paymentTransactions[0].payout.currency, //currency
                  createdDate:result.createdDate, //createdDate
                  cardHolderName: result.cardHolderName //cardHolderName
                }
              );
              
              const savedData = await payment.save();
              console.log(savedData);
              res.json(savedData);
          })
      } catch (error) {
        console.log(error);
      }
};
// missing
exports.create3DPayment = async (req,res) => {
  /*
      Required values;

      {
        "price": 100.0,
        "paidPrice": 100.0,
        "walletPrice": 0.0,
        "installment": 1,
        "callbackUrl": 'https://localhost:5000/craftgate-3DSecure-callback',
        "card": {
          "cardHolderName": "Unity 3D",
          "cardNumber": "5258640000000001",
          "expireYear": "2044",
          "expireMonth": "07",s
          "cvc": "000"
        },
        "items": [
          {
            "name": "Basic",
            "price": 100.0
          }
        ]
      }

   */
};
// missing
exports.createMultiPayment = async (req,res) => {
  /*
      Required values;

      {
        "price": 100.0,
        "paidPrice": 100.0,
        "walletPrice": 0.0,
        "installment": 1,
        "conversationId": '456d1297-908e-4bd6-a13b-4be31a6e47d5',
        "paymentGroup": Craftgate.Model.PaymentGroup.ListingOrSubscription,
        "callbackUrl": 'https://localhost:5000/craftgate-3DSecure-callback',
        "card": {
          "cardHolderName": "Unity 3D",
          "cardNumber": "5258640000000001",
          "expireYear": "2044",
          "expireMonth": "07",s
          "cvc": "000"
        },
        "items": [
          {
            "name": "Basic",
            "price": 100.0
          }
        ]
      }

   */
};

// okey
exports.getListPayments = async (req, res) => {

  // ******* 1. YÖNTEM YAP ********
  try {
      const payments = await Payment.find({})
      console.log(payments);
      res.json(payments);
  } catch (err) {
    console.log(err);
  }
};
// okey
exports.getPaymentById = async (req, res,next) => {

    // ******* 1.YÖNTEM MODELDEN *************
    const {id} = req.params;
    console.log({id});
    if (!id) {
      return console.log(`Missing paramter: ${_id}`);
    }
    try {
      const payment = await Payment.findOne({id:id});
      res.json(payment);
    } catch (e) {
      next(e);
    }

  // ******* 2.YÖNTEM SANDBOX API'DEN **********

  /* try {
    craftgate
      .paymentReporting()
      .retrievePayment(id)
      .then(function (result) {
        res.json({ data: result, status: "success" });
      })
      .catch(function (err) {
        res.status(500).json({ error: err.message });
      });
    }catch (err) {
      res.status(500).json({ error: err.message });
    } */
};
