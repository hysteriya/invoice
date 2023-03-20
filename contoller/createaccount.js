const accountmodel=require('../models/accountmodel');

module.exports.createaccount=async function createaccount(req, res){
    try{
        const data= req.body;
        let account= await accountmodel.create(data);
        if (account){
            res.json({message:'account created', data:account});
        }
        else{
            res.json({message:'error creating an account'});
        }
    }
    catch(err){
        console.log(err);
    }
}
