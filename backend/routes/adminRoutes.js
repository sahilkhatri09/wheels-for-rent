const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.use(isAuthenticatedUser, authorizeRoles('admin'));

router.get('/user', userController.getAllUser);
router.get('/booking', bookingController.getAllbooking);
router.route('/vehicle/:id').patch(vehicleController.updateVehicle).delete(vehicleController.deleteVehicle);
router.route('/vehicle').post(vehicleController.createVehicle).get(vehicleController.getAllVehicles);


module.exports = router;

