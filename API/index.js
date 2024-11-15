require('dotenv').config()
const morgan = require('morgan')
const express = require('express');
const cors = require('cors');

const app = express();

const { connectDatabase } = require('./DB/sqllite');
connectDatabase()

const Routes = require('./routes')
const {auth} = require('./middleware/auth')

app.use(morgan('dev'));

// Use CORS middleware
app.use(cors({
    origin: '*', // Replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true, // If you need to send cookies or authentication headers
  }));
  
  app.use(express.json());

// app.use('/', (request, response) => {
//     response.json({ result: true, message: "Hi" })
// });

app.use('/api', Routes.auth);

// app.use(auth)
app.use('/api', Routes.flights);
app.use('/api', Routes.seats);
app.use('/api', Routes.passengers);
app.use('/api', Routes.ancillary_services);
app.use('/api', Routes.meal_preferences);

app.listen('8000', () => {
    console.log('server start 8000')
})
