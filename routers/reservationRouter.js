const router=require('express').Router();
const {createReservation,getReservations,changeStatusReservation}=require('../controllers/reservationController.js');
const {authAdmin,authCoiffure,authClient} = require("../middleware/auth");
router.post('/:idClient/:idCoiffure',authClient,createReservation);
router.get('',getReservations);
router.put('/:idCoiffure/:idReservation',authCoiffure,changeStatusReservation);
module.exports=router;