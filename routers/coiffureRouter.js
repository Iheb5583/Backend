const router=require('express').Router();
const {getallCoiffure,getCoiffureById,updateCoiffure,addServiceForCoiffure}=require('../controllers/coiffureController');
router.get('',getallCoiffure);
router.get('/:id',getCoiffureById);
router.put('/:id',updateCoiffure);
router.post('/:coiffureId/services',addServiceForCoiffure);
module.exports=router;