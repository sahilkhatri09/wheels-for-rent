const express = require('express');
const authController = require('../controllers/authController')
const userController = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth')

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(isAuthenticatedUser);

router.get('/logout', authController.logout);
router.get('/bookings', userController.getBookings);
router.get('/me', userController.me);

module.exports = router;