const sql =  require('../config/dbpg');
const UserModel = require('../models/userModel')
const getallClient=async(req,res)=>{
    try {
        const result = await sql`SELECT * FROM "client"`;
        if(result){
          console.log(result);
          res.json(result);
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: "Internal server error" });
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

/*const updateClient = async (req, res) => {
  const { id } = req.params; // Change from req.params.id to req.params
  const { userName, firstName, lastName, address, city, phoneNumber, birthDate } = req.body;
  let updateStatement = 'UPDATE client SET';
  if (userName) {
    updateStatement += ` username = '${userName}',`;
  }
  if (firstName) {
    updateStatement += ` first_name = '${firstName}',`;
  }
  if (lastName) {
    updateStatement += ` last_name = '${lastName}',`;
  }
  if (address) {
    updateStatement += ` address = '${address}',`;
  }
  if (city) {
    updateStatement += ` city = '${city}',`;
  }
  if (phoneNumber) {
    updateStatement += ` phone_number = '${phoneNumber}',`;
  }
  if (birthDate) {
    updateStatement += ` date_of_birth = '${birthDate}',`;
  }
  // Remove the trailing comma
  updateStatement = updateStatement.slice(0, -1);
  updateStatement += ` WHERE id = ${id};`;
  console.log(updateStatement);
  try {
    const result = await sql`${updateStatement}`;
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Client with id ' + id + ' is not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};*/
const updateClient = async (req, res) => {
  const { id } = req.params;
  const { userName, firstName, lastName, address, city, phoneNumber, birthDate } = req.body;
  console.log(req.body);
  try {
    let formattedBirthDate = null;
    if (birthDate) {
      formattedBirthDate = new Date(birthDate).toISOString();
    }
    console.log("this date formated "+formattedBirthDate);
    const result = await sql`UPDATE "client" SET username = ${userName}, first_name = ${firstName}, last_name = ${lastName}, address = ${address}, city = ${city}, phone_number = ${phoneNumber}, date_of_birth = ${formattedBirthDate} WHERE id = ${id};`;
    if (!result) {
      return res.status(404).json({ message: 'Client with id ' + id + ' is not found' });
    }
    const resultfinal = await sql`select * from "client" where id =${id}`;
;    res.json(resultfinal[0]);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error updating client' });
  }
};






module.exports={getallClient,getClientById,updateClient};