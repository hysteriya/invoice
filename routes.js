const express=require('express');
const api=express.Router();
const {createaccount}=require('../controller/createaccount');
const {createinvoice, invoice}=require('../controller/createinvoice');
//const {}=require('../controller/invoicelist');


api
.route('/invoicelist')
.get(invoice);

api
.route('/createaccount')
.post (createaccount);

api
.route('/createinvoice')
.post(createinvoice);


module.exports=api;
