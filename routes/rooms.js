const express = require('express');
const router = express.Router();
const controller = require('../controllers/roomsController');

router.get('/', controller.getAllRooms);
router.get('/:codigo', controller.getRoomById);
router.post('/', controller.createRoom);
router.put('/:codigo', controller.updateRoom);
router.delete('/:codigo', controller.deleteRoom);

module.exports = router;
