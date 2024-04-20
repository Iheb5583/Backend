const router=require('express').Router();
const {getallClient,getClientById,updateClient}=require('../controllers/clientController');
router.get('',getallClient);
router.get('/:id',getClientById);
router.put('/:id',updateClient);
module.exports=router;