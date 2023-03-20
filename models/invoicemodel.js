const mongoose= require('mongoose');
mongoose.set('strictQuery', true);
const accountmodel= require('../models/accountmodel');

const link='mongodb+srv://admin:KrEd773LnwvVA0jg@cluster0.vvougkt.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(link)
.then(console.log('invoice db connected'))
.catch(function(err){
    console.log(err);
});

const invoiceschema= new mongoose.Schema({
    date:{
        type:Date,
        default: Date.now(),
        required:true
    },
    customerid:{
        type: mongoose.Schema.ObjectId,
        ref:'accountmodel',
        required:[true, 'invoice must belong to an accountid']
    },
    accountarray:[{
        accountname: {
            type:mongoose.Schema.ObjectId,
            required:true
        },
        amount:{
            type: Number,
            required:true        
        }
    }],
    totalamount:{
        type:Number,
        required:true
    },
    invoicenumber:{
        type: String,
        required:true,
        unique:true
    },
    year:{
        type:String,
        enum:['2022-23', '2023-24', '2024-25'],
        required:true,
    }
});

invoiceschema.pre('save', function(next){
    //condition 1: imbedded in your schema

    //condition 2: 
    //finding total
    let total = 0;
    for (let i = 0; i < this.accountarray.length; i++) {
      total += this.accountarray[i].amount;
    }
    //throwing err
    if (total !== this.totalamount) {
      const err = new Error('AccountArray total must match Total Amount');
      err.status = 400;
      return next(err);
    }

    //condition 3:
    if (this.accountarray.length === 0) {
        return next(new Error('AccountArray must have at least one object'));
    }

    //condition 4: imbedded in schema
    //condition 5: imbedded in schema
    next();
});

const invoicemodel=mongoose.model('invoicemodel', invoiceschema);

//goodluck breaking this down
invoiceschema.post('save', async function (doc){
    const {year, totalamount, customerid}= doc;
    const account = await accountmodel.findById(customerid);
    const balances= account.balances;
    let balancetoupdate;
    for (let i=0; i<balances.length; i++){
        const balanceyear=Object.keys(balances[i])[0];
        if (balanceyear===year){
            balancetoupdate=balances[i];
            break;
        }
    }
    if (balancetoupdate){
        balancetoupdate[year]+=totalamount;
        await account.save();
    }
});

module.exports=invoicemodel;