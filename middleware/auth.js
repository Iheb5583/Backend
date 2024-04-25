const jwt=require('jsonwebtoken');
const UserModel = require('../models/userModel.js')
require('dotenv').config();

const authAdmin = async (req,res,next)=>{
    try{
        const token = req.cookies.access_token;
        if(!token){
            return res.status(401).json({error:"access_token not found"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        const user = await UserModel.findById(decoded.id);
        if (user.role === 'admin') {
            req.user = user;
            next();
        } else {
            return res.status(403).json({ message: 'Access Denied. Only admins are allowed.' });
        }
    }catch(err){
        console.error(err);
        return res.status(401).json({error:"unauthorized"});
    }
}

const authCoiffure = async (req, res, next) => {
    try{
        const token = req.cookies.access_token ;
        if(!token){
            return res.status(401).json({error:"access_token is not found"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        if (user.role === 'coiffure') {
            req.user = user;
            next();
        } else {
            return res.status(403).json({ message: 'Access Denied. Only coiffure are allowed.' });
        }
    }catch(err){
        console.error(err);
        return res.status(401).json({error:"unauthorized"});
    }
};

const authClient = async (req, res, next) => {
    try{
        const token = req.cookies.access_token ;
        if(!token){
            return res.status(401).json({error:"access_token not found"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        if (user.role === 'client') {
            req.user = user;
            next();
        } else {
            return res.status(403).json({ message: 'Access Denied. Only client are allowed.' });
        }
    }catch(err){
        console.error(err);
        return res.status(401).json({error:"unauthorized"});
    }
};

module.exports = {authAdmin,authCoiffure,authClient};