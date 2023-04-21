const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.route('/').get(vehicleController.getAll);
router.route('/:id').get(vehicleController.getVehicle)

module.exports = router;