const mongoose= require('mongoose');
mongoose.set('strictQuery', true);

const link='mongodb+srv://admin:KrEd773LnwvVA0jg@cluster0.vvougkt.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(link)
.then(()=>console.log('account db connected'))
.catch(function(err){
    console.log(err);
});

const accountschema=mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      balances: [{
        '22-23':{
            type: Number
        },
        '23-24':{
            type:Number
        },
        '24-25':{
            type:Number
        }
    }]
});

const accountmodel=mongoose.model('accountmodel', accountschema);
module.exports=accountmodel;
