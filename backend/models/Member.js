const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    id:{
        type:Number,
    },
    createDate:{
        type:Date,
    },
    /* status:{
        type:mongoose.SchemaTypes.Status,
    }, */
    memberExternalId:{
        type:String,
    },
    name:{
        type:String,
    },
    address:{
        type:String,
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
    identityNumber:{
        type:String,
    },
    /* memberType:{
        type:mongoose.SchemaTypes.MemberType,
    }, */
    contactName:{
        type:String,
    },
    contactSurname:{
        type:String,
    },
});

const Member = mongoose.model("Member",MemberSchema);

module.exports = Member;