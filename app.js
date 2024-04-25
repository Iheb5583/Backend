const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const mongoose=require('./config/db.js');
const authRoutes =require('./routers/authRouter.js');
const coiffureRouter=require('./routers/coiffureRouter.js');
const clientRouter = require('./routers/clientRouter.js');
const reservationRouter=require('./routers/reservationRouter.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());

app.use('/users',authRoutes);
app.use('/coiffure',coiffureRouter);
app.use('/client',clientRouter);
app.use('/reservation',reservationRouter);

app.listen(3800,()=>{
    console.log("Port 3800 Working");
})