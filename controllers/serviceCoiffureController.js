const ServiceCoiffureModel = require('../models/serviceCoiffureModel')

const updateServiceOfCoiffure = async (req, res) => {
    const { coiffureId, serviceId } = req.params;
    const { name, price, duration, note } = req.body;
    try {
        const coiffure = await CoiffureModel.findById(coiffureId);
        if (!coiffure) {
            return res.status(404).json({ message: 'Coiffure user with id '+coiffureId+' not found' });
        }
        const serviceIndex = coiffure.services.findIndex(service => service._id.toString() === serviceId);
        if (serviceIndex === -1) {
            return res.status(404).json({ message: 'Service with id '+serviceId+' not found for coiffure with id '+coiffureId });
        }
        coiffure.services[serviceIndex] = { _id: serviceId, name, price, duration, note };
        await coiffure.save();
        res.json(coiffure);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };