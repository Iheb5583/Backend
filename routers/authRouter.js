const router=require('express').Router();
const {getallUsers,getUserById,deleteUserById,getAllCoiffure,getAllClient,loginUser,registerUser,logoutUser}=require('../controllers/authController.js');

router.get('', getallUsers);
router.get('/:id',getUserById);
router.delete('/:id', deleteUserById);
router.get('/role/coiffures', getAllCoiffure);
router.get('/role/clients', getAllClient);
router.post('/login',loginUser);
router.post('/register',registerUser);
router.post('/logout',logoutUser);
module.exports=router;