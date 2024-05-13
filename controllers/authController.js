const sql =  require('../config/dbpg')
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
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
    try {
        const result = await sql`SELECT * FROM "user" WHERE email = ${email}`;
        const userExist = result[0];
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
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

 const registerUser = async (req, res) => {
    const { email, password, confirmPassword, role } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return res.status(400).json({ message: "Email is empty." });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email is not valid." });
    }
    else if (!password) {
        return res.status(400).json({ message: "Password is empty." });
    }
    else if (!confirmPassword) {
        return res.status(400).json({ message: "Confirm password is empty." });
    }

    try {
        const result = await sql`SELECT * FROM "user" WHERE email = ${email}`;
        if (result.length > 0) {
            return res.status(400).json({ message: "Email already exists." });
        }
        if (password !== confirmPassword) {
            await sql.query('ROLLBACK');
            return res.status(400).json({ message: "Password does not match." });
        }
        if (!role) {
            return res.status(400).json({ message: "Role is empty." });
        }
        else if (role == "admin") {
            return res.status(400).json({ message: "You cannot be an admin." });
        }
        else if (role !== "coiffure" && role !== "client") {
            return res.status(400).json({ message: "The role " + role + " does not exist." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await sql`INSERT INTO "user" (email, password, role) VALUES (${email}, ${hashedPassword}, ${role}) RETURNING * `;
        
        const newRecordUser = await sql`SELECT * FROM "user" WHERE email = ${email}`;
        if (newUser.length === 0) {
            throw new Error("Failed to retrieve newly inserted user.");
        }
        const IdnewRecordUser = newRecordUser[0].id;
        console.log(IdnewRecordUser);
        if (role == 'coiffure') {
            console.log(IdnewRecordUser+"coi");
            await sql`INSERT INTO "coiffure" (user_id) VALUES (${IdnewRecordUser})`;
        } else if (role == 'client'){
            console.log(IdnewRecordUser+"cli");
            await sql`INSERT INTO "client" (user_id) VALUES (${IdnewRecordUser})`;
        }
        res.json(newRecordUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};
const logoutUser = async (req, res) => {
    const token = req.cookies.access_token; 
    if (token) {
        res.cookie('access_token','',{httpOnly:true}).json({message:"ok"});
    }else{
        return res.json({message:"access_token is empty"});
    }
};

const getProfile= async(req,res)=>{
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ error: "access_token is not found" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken.email) {
            return res.status(401).json({ error: "Invalid token" });
        }
        const result = await sql`SELECT * FROM "user" WHERE email = ${decodedToken.email}`;
        const user = result[0];
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        let profileInfo = {};
        if (user.role === 'client') {
            const clientResult = await sql`SELECT * FROM "client" WHERE user_id = ${user.id}`;
            profileInfo = { ...user, ...clientResult[0] };
        } else if (user.role === 'coiffure') {
            const coiffureResult = await sql`SELECT * FROM "coiffure" WHERE user_id = ${user.id}`;
            profileInfo = { ...user, ...coiffureResult[0] };
        }
        res.json(profileInfo);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports={getallUsers,getUserById,deleteUserById,getAllCoiffure,getAllClient,loginUser,registerUser,logoutUser,getProfile};