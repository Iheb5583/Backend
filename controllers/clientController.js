const ClientModel = require('../models/clientModel')
const UserModel = require('../models/userModel')
const getallClient=async(req,res)=>{
    try{
        const userClients=await UserModel.find({role:"client"});
        const AllClientInfo = [];
        for (const client of userClients) {
          console.log(client._id);
          const clientInfo = await ClientModel.find({ user: client._id });
          console.log(clientInfo);
          const userClientInfo = {
            user: client,
            clientInfo
          };
          AllClientInfo.push(userClientInfo);
        }
        res.json({"clients":AllClientInfo});
    }
    catch(err){
        res.json({message:err});
    }
}
const getClientById = async (req, res) => {
    const clientId = req.params.id; 
    try {
      const client = await ClientModel.findById(clientId);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
      res.json(client);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { username, firstName, lastName, address, city, phoneNumber } = req.body;
  try {
      const updatedClient = await ClientModel.findByIdAndUpdate(
          id,
          { username, firstName, lastName, city, address, phoneNumber },
          { new: true }
      );
      if (!updatedClient) {
          return res.status(404).json({ message: 'Client with id ' + id + ' is not found' });
      }
      res.json(updatedClient);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports={getallClient,getClientById,updateClient};