const router=require('express').Router();
const {getallUsers,getUserById,deleteUserById,getAllCoiffure,getAllClient,loginUser,registerUser,logoutUser,getProfile}=require('../controllers/authController.js');
const {authAdmin,authCoiffure,authClient} = require("../middleware/auth");
router.get('/users',authAdmin, getallUsers);
router.get('/users/:id',authAdmin,getUserById);
router.delete('/users/:id',authAdmin, deleteUserById);
router.get('/users/role/coiffures', getAllCoiffure);
router.get('/users/role/clients', getAllClient);
router.post('/Login',loginUser);
router.post('/Register',registerUser);
router.post('/logout',logoutUser);
router.get('/Profile',getProfile);
module.exports=router;