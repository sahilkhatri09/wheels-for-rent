const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isAuthenticatedUser } = require('../middleware/auth')

router.use(isAuthenticatedUser);
router.post('/:id', bookingController.bookVehicle);
router.delete('/', bookingController.deleteBooking);

module.exports = router;