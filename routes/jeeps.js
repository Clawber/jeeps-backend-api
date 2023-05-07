const express = require("express");
const router = express.Router()

const pool = require('../config/db')


// db querying
let jeepneyID = 1
let queryString = `SELECT coords FROM tracker WHERE id = ${jeepneyID} ORDER BY id`;
pool.query(queryString, (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});


const jeeps = [
  {id: 1, coords: [14.6575533,	121.0742258] }, 
  {id: 2, coords: [14.64728358,	121.0623173] }, 
]



// http://localhost:3000/api/jeeps/
router.get('/', (req, res) => {
  res.send(jeeps);
});


router.get('/:id', (req, res) => {
  id = req.params.id;
  // let jeep = jeeps.find(c => c.id === parseInt(id));
  let jeep;
/*
link:
output of: 
https://jeeps-api.onrender.com/api/jeeps/1
{"id":1,"coords":[14.6575533,121.0742258]}
*/

})



router.put('/:id', (req, res) => {
  const jeep = jeeps.find(c => c.id === parseInt(req.params.id))

  if (!jeep) {
    res.status(404).send('The jeep with the given ID was not found')
  }

  
  // TODO input validation JOI

  jeep.coords = req.body.coords;
  res.send(jeep);

  /*
  Sample request
  {
    "id": 1,
    "coords": [
        14.6575533,
        121.0742258
    ]
  }

  */

})

module.exports = router;


/* ------TODO
// endpoints needed


GET all jeeps
GET a single jeep

PUT a single jeep
  modify values

handle 
application/x-www-form-urlencoded


*/

// https://jeeps-api.onrender.com/api/jeeps/$id