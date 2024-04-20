const router=require('express').Router();
const {getallUsers,getUserById,getAllCoiffure,getAllClient}=require('../controllers/authController.js');

router.get('/', getallUsers);
router.get('/:id',getUserById);
router.get('/role/coiffures', getAllCoiffure);
router.get('/role/clients', getAllClient);
router.post('/register',)
module.exports=router;