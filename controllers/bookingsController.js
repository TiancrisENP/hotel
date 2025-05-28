const db = require('../db');

// --- Reservas
exports.getAllBookings = (req, res) => {
  db.query('SELECT * FROM reservas', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getBookingById = (req, res) => {
  db.query('SELECT * FROM reservas WHERE codigo = ?', [req.params.codigo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'No encontrada' });
    res.json(results[0]);
  });
};

exports.createBooking = (req, res) => {
  const { codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida } = req.body;
  db.query(
    'INSERT INTO reservas (codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida) VALUES (?, ?, ?, ?, ?, ?)',
    [codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.updateBooking = (req, res) => {
  const { codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida } = req.body;
  db.query(
    'UPDATE reservas SET codigo_habitacion=?, nombre_cliente=?, telefono_cliente=?, fecha_reservacion=?, fecha_entrada=?, fecha_salida=? WHERE codigo=?',
    [codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida, req.params.codigo],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Reserva actualizada' });
    }
  );
};

exports.deleteBooking = (req, res) => {
  db.query('DELETE FROM reservas WHERE codigo=?', [req.params.codigo], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Reserva eliminada' });
  });
};
