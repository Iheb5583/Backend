const postgres = require('postgres');
const sql = postgres({
	user: 'postgres',
	password: 'root',
	host: 'localhost',
	port: '5432',
	database: 'coiffureapplication',
});
module.exports = sql
// client.connect()
// .then(() => {
//     console.log('Connected to PostgreSQL database');
// })
// .catch((err) => {
//     console.error('Error connecting to PostgreSQL database', err);
// });

// const query = `
// CREATE TABLE IF NOT EXISTS user(
//     id SERIAL PRIMARY KEY,
//     email VARCHAR(255) NOT NULL,
//     role VARCHAR(50) DEFAULT 'client' CHECK (role IN ('admin', 'coiffure', 'client')),
//     password VARCHAR(255) NOT NULL
// )
// `;
// client.query(query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Table User CREATED successful');
// });
// module.exports =  client ;