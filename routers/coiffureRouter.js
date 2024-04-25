const router=require('express').Router();
const {getallCoiffure,getCoiffureById,updateCoiffure,addServiceToCoiffure,deleteServiceFromCoiffure,udpateServiceOfCoiffure}=require('../controllers/coiffureController');
const {authAdmin,authCoiffure,authClient} = require("../middleware/auth.js");

router.get('',getallCoiffure);
router.get('/:id',getCoiffureById);
router.put('/:id',updateCoiffure);
router.post('/:coiffureId/services',addServiceToCoiffure);
router.delete('/:coiffureId/services/:serviceId', deleteServiceFromCoiffure);
router.put('/:coiffureId/services/:serviceId', udpateServiceOfCoiffure);
module.exports=router;