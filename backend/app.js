const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const adminRoutes = require('./routes/adminRoutes')

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: true, credentials: true }));

//Avalilable Routes
//1) Admin Routes
app.use('/api/v1/admin', adminRoutes);

//2) User Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/vehicle', vehicleRoutes);


app.all('*', (req, res, next) => {
    next(new AppError('cannot find this url'));
})

app.use(globalError);

module.exports = app;