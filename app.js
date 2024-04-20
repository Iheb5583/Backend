const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const mongoose=require('./config/db.js');
const authRoutes =require('./routers/authRouter.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users',authRoutes);

app.listen(3800,()=>{
    console.log("Port 3800 Working");
})