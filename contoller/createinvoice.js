const invoicemodel=require('../models/invoicemodel');

//creating invoice
module.exports.createinvoice=async function createinvoice(req, res){
    try{
        const data= req.body;
        console.log(data);
        let invoice= await invoicemodel.create(data);
        if (invoice){
            res.json({message:'invoice created', data:invoice});
        }
        else{
            res.json({message:'error creating an invoice'});
        }
    }
    catch(err){
        console.log(err);
    }
}

//search query
module.exports.invoice=async function invoice(req, res){
    try{
        //getting parameters skip and limit in int with default values
        const skip= parseInt(req.query.skip)||0;
        const limit= parseInt(req.query.limit)||10;
        const searchtext = req.query.searchtext||'';
        
        //building a searchquery with search optimisation
        const searchquery={
            $or:[
                {'accountarray.accountname':{
                    $regex: searchtext
                }},
                {'accountarray.amount':{
                    $regex: searchtext
                }},
                {invoicenumber:{
                    $regex: searchtext
                }}
            ]
        }
        console.log(searchquery);
        const invoicelist= await invoicemodel.find(searchquery)
        .skip(skip)
        .limit(limit)
        .populate('customerid')
        .populate('accountarray.accountname');

        if (invoicelist.length === 0) {
            res.status(404).send('No matching invoices found');
          } else {
            res.status(200).send(invoicelist);
          }
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}



