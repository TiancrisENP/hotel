const express = require('express');
const app = express();
const roomsRoutes = require('./routes/rooms');
const bookingsRoutes = require('./routes/bookings');

app.use(express.json());
app.use(express.static('public'));
app.use('/rooms', roomsRoutes);
app.use('/bookings', bookingsRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

