const dotenv = require('dotenv');
const mongoose = require('mongoose')
// adding environment variable before starting of app

dotenv.config({ path: './config.env' });

// managing uncaughtException
// like print(a) where a is not defined
process.on('uncaughtException', err => {
    console.log('Uncaught Exception 🥲');
    console.log(err.name, err.message);
    // process.exit(1);
})

const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
)

// connecting to database
mongoose.set('strictQuery', false);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully')
})

// listening to port
const port = process.env.PORT
const server = app.listen(port, () => {
    console.log(`App running port ${port}`);
})


//managing all unhandled rejection
// like database connection rejected
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection 🥲');
    console.log(err.name, err.message);
    // server.close(() => {
    //     process.exit(1);
    // })
})