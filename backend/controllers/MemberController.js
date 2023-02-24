const Craftgate = require("@craftgate/craftgate");
const { default: Currency } = require("@craftgate/craftgate/dist/model/Currency.js");
const craftgate = require('../client/account.js');
const Member = require('../models/Member');

function createDate(days, hours, minutes, seconds) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
  }
  
// okey
exports.createMember = async (req,res) => {
    /*
        Create Request Required values;
        {
            "contactName": "Mehmet", //Required
            "contactSurname": "Sönmez", //Required 
            "memberExternalId": "e69dbbbd-9a4f-4a75-871d-8d15c094abb5" , //Required,unique 
            "name": "Mehmet Sönmez", 
            "address": "Suadiye Mah. Örnek Cd. No:23, 34740 Beylikdüzü/İstanbul" , //Required
            "email": "mehmet.sonmez@example.com", //Required
            "phoneNumber": "905551111111" , //Required
            "identityNumber": "11111111120",
        }
    */
        try {
            var input = req.body;
            
            craftgate
            .onboarding()
            .createMember(input)
            .then(async function (result){
                const member = new Member(
                    {
                        id:result.id,
                        contactName:result.contactName,
                        contactSurname:result.contactSurname,
                        createDate:result.createdDate,
                        memberExternalId:result.memberExternalId,
                        name:result.name,
                        address:result.address,
                        email:result.email,
                        phoneNumber:result.phoneNumber,
                        identityNumber:result.identityNumber,
                        
                    }
                );
                const savedData = await member.save();
                res.json(savedData);
            });
        } catch (err) {
            console.log(err);
        }

};
// okey
exports.retrieveMember = async (req,res,next) => {
         /*
            Request Required values;
            {
                "id": 87615, Required
                
            }
        */
        
        // ******* 1.YÖNTEM MODELDEN *************
        const {id} = req.params;
        console.log({id});
        if (!id) {
        return console.log(`Missing paramter: ${id}`);
        }
        try {
        const member = await Member.findOne({id:id});
        res.json(member);
        } catch (e) {
        next(e);
        }


        // ******* 2.YÖNTEM SANDBOX API'DEN **********
        /*  try {
                const {id} = req.params;
                craftgate
                    .onboarding()
                    .retrieveMember(id)
                        .then(result => 
                                console.info('Buyer member retrieved', result),
                                res.json(result)
                                )
                        .catch(err => console.error('Failed to retrieve buyer member', err));
        } catch (error) {
                console.log(error);
        } */
};
// missing
exports.searchMembers = async (req,res) => {
    // play with request parameters to search members
   /*  const request = {
        name: 'Zeytinyağı Üretim',
        page: 0,
        size: 25,
        //memberIds: [1],
        memberType: Craftgate.Model.MemberType.LimitedOrStockJointCompany
    };

    craftgate
        .onboarding()
        .searchMembers(request)
            .then(result => console.info('Retrieved member search results', result))
            .catch(err => console.error('Failed to search member', err)); */
};
// okey
exports.updateMumber = async ( req,res) => {
    /*
        Update Request Required values;
        {
            "contactName": "Mehmet", Required
            "contactSurname": "Sönmez", Required
            "createdDate": "2023-02-06T12:26:05.292742389", 
            "memberExternalId": "e69dbbbd-9a4f-4a75-871d-8d15c094abb5" , 
            "name": "Mehmet Sönmez",  Required
            "address": "Suadiye Mah. Örnek Cd. No:23, 34740 Beylikdüzü/İstanbul" , Required
            "email": "mehmet.sonmez@example.com", Required
            "phoneNumber": "905551111111" ,     
            "identityNumber": "11111111120",
        }
    */
            try {
            const {id} = req.params;

            craftgate
                .onboarding()
                .updateMember(id, req.body)
                    .then(async function (result){
                        res.json(result);
                    })
                    .then(async function (result) {
                        const member = await Member.findOneAndUpdate({id:id},req.body,{
                            new: true,
                        });
                        console.log(member);
                    });

            } catch (error) {
                console.log(error);
            }

};
  