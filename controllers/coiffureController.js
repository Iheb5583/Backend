const CoiffureModel = require('../models/coiffureModel')

const getallCoiffure=async(req,res)=>{
    try{
        const userCoiffures=await User.find({role:"coiffure"});
        const AllCoiffureInfo = [];
        for (const coiffure of userCoiffures) {
          const coiffureInfo = await CoiffureModel.find({ user: coiffure._id });
          const userCoiffureInfo = {
            user: coiffure,
            coiffureInfo: coiffureInfo[0],
          };
          AllCoiffureInfo.push(userCoiffureInfo);
        }
        res.json({"coiffures":AllCoiffureInfo});
    }
    catch(err){
        res.json({message:err});
    }
}
const getCoiffureById = async (req, res) => {
    const coiffureId = req.params.id; 
    try {
      const coiffure = await CoiffureModel.findById(coiffureId);
      if (!coiffure) {
        return res.status(404).json({ message: 'Coiffure not found' });
      }
      res.json(coiffure);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}; 
const updateCoiffure = async (req, res) => {
    const { id } = req.params;
    const {username,firstName,lastName,address,city,phoneNumber} =req.body;
      try {
        const updatedCoiffure = await CoiffureModel.findByIdAndUpdate(
          id,
          {username,firstName,lastName,city,address,phoneNumber},
          { new: true }
        );
        if (!updatedCoiffure) {
          return res.status(404).json({ message: 'Coiffure with id '+id+' is not found' });
        }
        res.json(updatedCoiffure);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}; 

module.exports={getallCoiffure,getCoiffureById,updateCoiffure};