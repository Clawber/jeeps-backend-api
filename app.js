const express = require('express');
const Joi = require('joi');         //JOI for input validation
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

const PORT = 3000;

const userCourses = require('./routes/courses')
const userJeeps = require('./routes/jeeps')


app.use('/api/courses', userCourses);
app.use('/api/jeeps', userJeeps);


app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(PORT, () => console.log('Api deployed'));



/* TODO
link of API
https://jeeps-api.onrender.com/api/jeeps/id
https://jeeps-api.onrender.com/api/jeeps/1
*/