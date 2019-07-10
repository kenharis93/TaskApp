const express = require('express');
const cors = require('cors');
const task = require('./routes/api/task');
const connectDB = require('./config/db');

//create an express app
const app = express();
// Enable All CORS Requests
app.use(cors());

connectDB();

//set the middleware to parse data
app.use(express.json({ extended: false }));

//use the api routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tasks', require('./routes/api/task'));

//get request to root
/*
app.get('/:name', (req, res) => res.send('hello world ' + req.params.name));

app.post('/', (req, res) => res.send('post hello world 333'));
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server started');
});
