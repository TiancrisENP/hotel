const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingsController');

router.get('/', controller.getAllBookings);
router.get('/:codigo', controller.getBookingById);
router.post('/', controller.createBooking);
router.put('/:codigo', controller.updateBooking);
router.delete('/:codigo', controller.deleteBooking);

module.exports = router;
