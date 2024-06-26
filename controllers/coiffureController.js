const sql =  require('../config/dbpg');
const ServiceCoiffureModel = require('../models/serviceCoiffureModel')
const UserModel = require('../models/userModel');

const getallCoiffure=async(req,res)=>{
  try {
      const result = await sql`SELECT * FROM "coiffure"`;
      if (result) {
        const coiffures = result.map(coiffure => ({
          id: coiffure.id,
          namcoiffure: coiffure.namcoiffure,
          city: coiffure.city,
          address: coiffure.address,
          phoneNumber: coiffure.phoneNumber,
        }));
        console.log(coiffures);
        res.json({ coiffures });
      }
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: "Internal server error" });
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

const getAllServiceOfCoiffure = async (req, res) => {
  const { coiffureId } = req.params;
  try {
    const services = await ServiceCoiffureModel.find({ coiffure: coiffureId });
    res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addServiceToCoiffure = async (req, res) => {
  const { coiffureId } = req.params;
  const { name, price, duration, note } = req.body;
  try {
    const coiffure = await CoiffureModel.findById(coiffureId);
    if (!coiffure) {
      return res.status(404).json({ message: 'Coiffure user with id ' + coiffureId + ' not found' });
    }
    const newService = new ServiceCoiffureModel({ name, price, duration, note,coiffure:coiffureId });
    await newService.save();
    coiffure.services.push(newService._id);
    await coiffure.save();

    res.status(201).json({ message: 'Service added successfully', coiffure });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteServiceFromCoiffure = async (req, res) => {
  const { coiffureId, serviceId } = req.params;
  try {
      const coiffure = await CoiffureModel.findById(coiffureId);
      if (!coiffure) {
          return res.status(404).json({ message: 'Coiffure user with id '+coiffureId+' not found' });
      }
      coiffure.services = coiffure.services.filter(service => service.toString() !== serviceId);
      await coiffure.save();
      await ServiceCoiffureModel.findByIdAndDelete(serviceId);
      res.json({ message: 'Service deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const udpateServiceOfCoiffure = async (req, res) => {
  const { coiffureId , serviceId } = req.params;
  const { name, price, duration, note,reduction } = req.body;
  try {
    const service = await ServiceCoiffureModel.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service user with id ' + serviceId + ' not found' });
    }if(service.coiffure!=coiffureId){
      return res.status(404).json({ message: 'is not you service' });
    }
    const updatedServiceCoiffure = await ServiceCoiffureModel.findByIdAndUpdate(
      serviceId,
      {name, price, duration, note,reduction},
      { new: true }
    );
    res.status(201).json({ message: 'Service Udpate successfully', updatedServiceCoiffure });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports={getallCoiffure,getCoiffureById,updateCoiffure,getAllServiceOfCoiffure,addServiceToCoiffure,deleteServiceFromCoiffure,udpateServiceOfCoiffure};