const db = require('../db');

// --- Habitaciones
exports.getAllRooms = (req, res) => {
  db.query('SELECT * FROM habitaciones', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getRoomById = (req, res) => {
  db.query('SELECT * FROM habitaciones WHERE codigo = ?', [req.params.codigo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(results[0]);
  });
};

exports.createRoom = (req, res) => {
  const { numero, tipo, valor } = req.body;
  db.query('INSERT INTO habitaciones (numero, tipo, valor) VALUES (?, ?, ?)', [numero, tipo, valor], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId });
  });
};

exports.updateRoom = (req, res) => {
  const { numero, tipo, valor } = req.body;
  db.query('UPDATE habitaciones SET numero=?, tipo=?, valor=? WHERE codigo=?', [numero, tipo, valor, req.params.codigo], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Habitación actualizada' });
  });
};

exports.deleteRoom = (req, res) => {
  db.query('DELETE FROM habitaciones WHERE codigo=?', [req.params.codigo], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Habitación eliminada' });
  });
};
