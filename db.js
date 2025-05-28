const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0221',
  database: 'hotel_db'
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conectado a MySQL');
});

module.exports = connection;
