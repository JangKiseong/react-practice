const mysql = require('mysql');			//mysql - database
require('date-utils');
require('dotenv').config();
let connection;

const handleDisconnect = () => {
	connection = mysql.createConnection({
		host : process.env.DB_HOST,
		port : process.env.DB_PORT,
		user : process.env.DB_USER,
		password : process.env.DB_PASSWORD,
		database : process.env.DB_DATABASE,

		multipleStatements: true

	});

	connection.connect(err => {
		if(err){
			console.log('error when connection to db :',err);
			setTimeout(handleDisconnect, 2000);
		}
	});

	connection.on('error', err => {
		console.log('db error',err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			const date = new Date();
			const update_time=date.toFormat('HH24:MI');
			const update_date=date.toFormat('YYYY-MM-DD');
			console.log("connection lost"+update_date+update_time);
			handleDisconnect();
		} else throw err;
	});

	const date = new Date();
	const update_time = date.toFormat('HH24:MI');
	const update_date = date.toFormat('YYYY-MM-DD');
	console.log("CONNECT DATABASE AT "+update_date+update_time);
}

const getConnection = () => { return connection }

handleDisconnect();

module.exports = {
	getConnection:getConnection
}
