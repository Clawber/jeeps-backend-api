// uses express
// joi input validation
const express = require('express');
const Joi = require('joi');       //capital because class
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course1'}, 
  { id: 2, name: 'course2'}, 
  { id: 3, name: 'course3'}, 

]

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  // req.params to get req fields  
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // if no course (error), send 404
  if (!course) {
    res.status(404).send('The course with the given ID was not found')
  }
  res.send(course);
});

// need to parse json
// post input validation
app.post('/api/courses', (req, res) => {
  // declaring schema, for input validation
  const result = validateCourse(req.body);    // object destructuring possible
  
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }


  // js truthy falsy bullshit, true when not null
  if (result.error) {
    // super dirty joi traversal
    res.status(400).send(result.error.details[0].message);
    return;
  }

  /*-----------------without joi----------------
  if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad Request
    res.status(400).send('Name is required and should be minimum 3 chars')
    return;
  }
  */

  /*Joi notes
  error value   joi.validate
  */


  const course = {
    id: courses.length + 1,   //no database version
    name: req.body.name     // need to parse json first
  };
  courses.push(course);
  res.send(course);
});


/*
  modify a course
    look for the course
    if not exist, error 404

    validate 
    if invalid, 400 - Bad request

    update course string
    return updated course
    
*/
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))

  if (!course) {
    res.status(404).send('The course with the given ID was not found.')
    return;
  }

  const result = validateCourse(req.body);    // object destructuring possible
  
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);


})

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema)
}



app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // not found, error 404
  if (!course) {
    res.status(404).send('The course with the given ID was not found')
  }

  // find index, delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);


});



app.listen(3003, () => console.log('listin'));



/* TODO



https://web.postman.co/workspace/My-Workspace~b7431ffc-0aee-4aae-88e9-ea819342ca72/request/create?requestId=bad2cad2-4f05-40aa-b744-12c229fe6d67
Joi how to allow any parameter (in id)
yt video in 47:59


https://jeeps-api.onrender.com/


*/