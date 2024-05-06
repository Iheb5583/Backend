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
const assessmentRouter=require('./routers/assessmentRouter.js');
const mailRouter=require('./routers/mailRouter.js');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));


app.use('/api',authRoutes);
app.use('/api/coiffure',coiffureRouter);
app.use('/api/client',clientRouter);
app.use('/api/reservation',reservationRouter);
app.use('/api/assessment',assessmentRouter);
app.use('/api/email',mailRouter);

app.listen(3800,()=>{
    console.log("Port 3800 Working");
})