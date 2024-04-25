const router=require('express').Router();
const {getallClient,getClientById,updateClient}=require('../controllers/clientController');
const {authAdmin,authCoiffure,authClient} = require("../middleware/auth");

router.get('',getallClient);
router.get('/:id',getClientById);
router.put('/:id',updateClient);
module.exports=router;