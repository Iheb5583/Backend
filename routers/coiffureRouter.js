const router=require('express').Router();
const {getallCoiffure,getCoiffureById }=require('../controllers/coiffureController');
router.get('',getallCoiffure);
router.get('/:id',getCoiffureById);
module.exports=router;