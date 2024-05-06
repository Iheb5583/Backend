const assessmentModel=require('../models/assessmentModel');
const ClientModel = require('../models/clientModel');
const CoiffureModel = require('../models/coiffureModel');
const addAssessmentForCoiffure = async (req,res)=>{
    const coiffureId=req.params.coiffureId;
    const clientId=req.params.clientId;
    const coiffure = await CoiffureModel.findById(coiffureId);
      if (!coiffure) {
        return res.status(404).json({ message: 'Coiffure not found' });
      }
      const client = await ClientModel.findById(coiffureId);
      if (!coiffure) {
        return res.status(404).json({ message: 'Client not found' });
      }
    try {
        const { rating, comment} = req.body;
        const assessment = new assessmentModel({
            rating,
            comment,
            coiffure: coiffureId,
            client: clientId
        });
        await assessment.save();
        res.status(201).json({ message: 'Assessment added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add assessment', error: error.message });
    }
}
const getAllAssessmentsForCoiffure = async(req,res)=>{
    try {
        const coiffureId = req.params.coiffureId;
        const assessments = await assessmentModel.find({ coiffure: coiffureId });
        res.status(200).json(assessments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get assessments', error: error.message });
    }
}

const deleteAssessmentByClient = async (req, res) => {
    try {
        const { clientId, coiffureId } = req.body;
        const deletedAssessment = await assessmentModel.findOneAndDelete({ client: clientId, coiffure: coiffureId });
        if (deletedAssessment) {
            res.status(200).json({ message: 'Assessment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Assessment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete assessment', error: error.message });
    }
};
module.exports={addAssessmentForCoiffure,getAllAssessmentsForCoiffure,deleteAssessmentByClient};