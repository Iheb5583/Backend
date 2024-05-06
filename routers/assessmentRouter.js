const router=require('express').Router();
const {addAssessmentForCoiffure,getAllAssessmentsForCoiffure,deleteAssessmentByClient}=require('../controllers/assessmentController.js');
const {authClient} = require("../middleware/auth");

router.post('/:coiffureId/:clientId',authClient,addAssessmentForCoiffure);
router.get('/:coiffureId',getAllAssessmentsForCoiffure);
router.delete('/:coiffureId',authClient,deleteAssessmentByClient);
module.exports=router;