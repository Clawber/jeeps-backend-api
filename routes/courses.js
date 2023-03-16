const express = require("express");
const router = express.Router()



const courses = [
  { id: 1, name: 'course1'}, 
  { id: 2, name: 'course2'}, 
  { id: 3, name: 'course3'}, 

]

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/api/courses', (req, res) => {
  res.send(courses);
});

router.get('/api/courses/:id', (req, res) => {
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
router.post('/api/courses', (req, res) => {
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
router.put('/api/courses/:id', (req, res) => {
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



router.delete('/api/courses/:id', (req, res) => {
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

module.exports = router;