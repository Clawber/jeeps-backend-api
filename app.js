// uses express
// joi input validation
const express = require('express');
const Joi = require('joi');       //capital because class
const app = express();
const cors = require('cors')

app.use(cors())

const PORT = 3000;

app.use(express.json());

// from another files
// courses
const userCourses = require('./routes/courses')
app.use('/api/courses', userCourses);

// jeeps
const userJeeps = require('./routes/jeeps')
app.use('/api/jeeps', userJeeps);





app.get('/', (req, res) => {
  res.send('Hello World');
});



app.listen(PORT, () => console.log('listin'));

// localhost:3000




/* TODO



https://web.postman.co/workspace/My-Workspace~b7431ffc-0aee-4aae-88e9-ea819342ca72/request/create?requestId=bad2cad2-4f05-40aa-b744-12c229fe6d67
Joi how to allow any parameter (in id)
yt video in 47:59


https://jeeps-api.onrender.com/api/jeeps/id

https://jeeps-api.onrender.com/api/jeeps/1

*/