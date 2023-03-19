const express=require('express');
const app= express();
const mongoose= require('mongoose');
mongoose.set('strictQuery', true);
const api=require('../routes/routes');

app.use(express.json());

//making server on port 5000
app.listen(5000, ()=>{
    console.log('server listening');
});

app.use('/api', api);
