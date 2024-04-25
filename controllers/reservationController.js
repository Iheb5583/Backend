const ReservationModel=require('../models/reservationModel');
const ClientModel=require('../models/clientModel');
const CoiffureModel=require('../models/coiffureModel');
const createReservation = async (req,res)=>{
    const {idService,date} =req.body;
    const clientId=req.params.idClient;
    const coiffureId=req.params.idCoiffure;
    try{
        const client = await ClientModel.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client with ClientId '+clientId+' not found' });
        }
        const coiffure = await CoiffureModel.findById(coiffureId);
        if (!coiffure) {
            return res.status(404).json({ message: 'Coiffure with CoiffureId '+coiffureId+' not found' });
        }
        const service = await ServiceModel.findOne({ _id: idService, client: clientId });
        if (!service) {
            return res.status(400).json({ message: 'Service with Id '+idService+' does not belong to the coiffure' });
        }
        const newReservation=new ReservationModel({
            client:clientId,
            coiffure:coiffureId,
            service:idService,
            date,
            status:'pending'
            });
            console.log(newReservation);
        await newReservation.save();
        res.status(201).json(newReservation);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}
const getReservations = async (req, res) => {
    try {
      const reservations = await ReservationModel.find();
      res.status(200).send(reservations);
    } catch (error) {
      res.status(500).send(error);
    }
  };

const changeStatusReservation = async (req, res) => {
    const coiffureId=req.params.idCoiffure;
    const reservationId=req.params.idReservation;
    const status = req.query.status;
    try {
      const coiffure = await CoiffureModel.findById(coiffureId);
        if (!coiffure) {
            return res.status(404).json({ message: 'Coiffure not found' });
        }
        const reservation = await ReservationModel.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        if(reservation.status!='Pending'){
          return res.status(404).json({ message: 'Reservation status is not pending' });
        }
        if (reservation.coiffure!= coiffureId) {
            return res.status(404).json({ message: 'Reservation with id '+reservationId+' does not belong to this coiffure taht have id '+coiffureId });
        }
        if(status=='Pending'){
            return res.status(409.).json({ message: 'The status can not be Pending.' });
        }
        reservation.status = 'confirmed';
        reservation.confirmedService = serviceId;
        await reservation.save();
        res.status(200).json(reservation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports={createReservation,getReservations,changeStatusReservation};