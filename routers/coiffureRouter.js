const router=require('express').Router();
const {getallCoiffure,getCoiffureById,updateCoiffure,getAllServiceOfCoiffure,addServiceToCoiffure,deleteServiceFromCoiffure,udpateServiceOfCoiffure}=require('../controllers/coiffureController');
const {authAdmin,authCoiffure,authClient} = require("../middleware/auth.js");

router.get('',getallCoiffure);
router.get('/:id',getCoiffureById);
router.put('/:id',updateCoiffure);
router.get('/:coiffureId/services',getAllServiceOfCoiffure);
router.post('/:coiffureId/services',authCoiffure,addServiceToCoiffure);
router.delete('/:coiffureId/services/:serviceId',authCoiffure, deleteServiceFromCoiffure);
router.put('/:coiffureId/services/:serviceId',authCoiffure, udpateServiceOfCoiffure);
module.exports=router;