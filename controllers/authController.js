const UserModel=require('../models/userModel');
const CoiffureModel=require('../models/coiffureModel');
const clientModel=require('../models/clientModel')
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
const { use } = require('../routers/authRouter');
require('dotenv').config();

const getallUsers=async(req,res)=>{
    try{
        const users=await UserModel.find();
        res.json(users);
    }
    catch(err){
        res.json({message:err});
    }
}
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(foundUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User with Id '+userId+' not found' });
        }
        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getAllCoiffure = async(req,res)=>{
    try {
        const coiffures = await UserModel.find({ role: 'coiffure' });
        res.json(coiffures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAllClient = async (req, res) => {
    try {
        const clients = await UserModel.find({ role: 'client' });
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const loginUser = async(req,res)=>{
    const {email,password}=req.body;
    const userExist=await UserModel.findOne({email});
   if(userExist){
        const passOk=bcrypt.compareSync(password,userExist.password);
        if(passOk){
            const token = jwt.sign({id:userExist._id,email:userExist.email,role:userExist.role},process.env.JWT_SECRET);
            res.cookie('access_token',token,{httpOnly:true}).json({userExist});
        }else{
            res.status(400).json({message:"password not match"});
        }
    }else{
        res.status(400).json({message:"email not exist"});
    }
}

const registerUser =async(req,res)=>{
    const {email,password,confirmPassword,role} =req.body;
    const resultat=await UserModel.findOne({email});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
        res.status(400).json({message:"email is empty."});
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email is not valid." });
    }
    else if(!password){
        res.status(400).json({message:"password is empty."});
    }
    else if(!confirmPassword){
        res.status(400).json({message:"confirm password is empty."});
    }
    else if(resultat){
        res.status(400).json({message:"email already exist."});
    }
    else if(password!==confirmPassword){
        res.status(400).json({message:"password not match."});
    }
    else if(!role){
        res.status(400).json({message:"role is empty."});
    }
    else if(role!=="admin" && role!=="coiffure" && role!=="client"){
        res.status(400).json({message:"the role "+role+" is not exist."});
    }
    else{
        const newUser=new UserModel({
            email,
            password:await bcrypt.hash(password,10),
            role
            });
            
            await newUser.save();
            if(role=='coiffure'){
                const newCoiffure=new CoiffureModel({
                    user: newUser._id,
                });
                newCoiffure.save();
            }else{
                const newClient=new clientModel({
                    user: newUser._id,
                });
                newClient.save();
            }
            try{
                res.json(newUser);
            }
            catch(err){
                res.json({message:err});
            }
    }
}

module.exports={getallUsers,getUserById,deleteUserById,getAllCoiffure,getAllClient,loginUser,registerUser};