const { default: Currency } = require('@craftgate/craftgate/dist/model/Currency');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    id : {
        type:Number,
    },
    items:[
        {
            name:{type:String},
            price:{type:mongoose.SchemaTypes.Decimal128} // DECİMAL
        },
    ],
    price : {
        type:mongoose.SchemaTypes.Decimal128 // DECİMAL
    },
    paidPrice : {
        type:mongoose.SchemaTypes.Decimal128 // DECİMAL
    },
    walletPrice : {
        type:mongoose.SchemaTypes.Decimal128 // DECİMAL
    },
    installment : {
        type:Number,
        required:true
    },
    currency: {
        type: String
    },
    createdDate : {
        type:Date,
    },
    cardHolderName: {
        type: String,
    },
    
});

const Payment = mongoose.model("Payment",PaymentSchema);

module.exports = Payment;