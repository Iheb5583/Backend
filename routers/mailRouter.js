const router=require('express').Router();
const {sendEmail}=require('../controllers/mailController');
const {authAdmin} = require("../middleware/auth");

router.get('',authAdmin,sendEmail);

module.exports=router;