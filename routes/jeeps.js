const Joi = require('joi');
const express = require("express");
const router = express.Router()

const pool = require('../config/db')

const coords_schema = Joi.object({
  coords: Joi.array().items(Joi.number().required(), Joi.number().required()).length(2).required()
})


const getJeeps = (request, response) => {
  console.log("GET all");
  pool.query("SELECT * FROM tracker", (error, results) => {
    if (error) {
      throw error
    } 
    response.status(200).json(results.rows)
  } )
}

// Bug TODO
const getJeepById = (request, response) => {
  console.log("GET by ID");
  const id = parseInt(request.params.id)

  pool.query(`SELECT coords FROM tracker WHERE id = ${id} ORDER BY id`, (error, results) => {
    if (error) {
      throw error
    } 

    coords = results.rows[0].coords
    message = {"id": id,
          "coords": [coords.x, coords.y]
        }

    response.status(200).json(message)
  } )
}





// https://jeeps-api.onrender.com/api/jeeps/1

// http://localhost:3000/api/jeeps/
router.get('/', getJeeps)
router.get('/:id', getJeepById)



// json data 
// {"coords": [14.64827247,121.0737752]}
router.post('/:id', (request, response) => {
  const { error } = coords_schema.validate(request.body)
  if (error) {
    response.status(400).json({ error: error.details[0].message});
  }

  console.log("POST request: \n Contents: ");

  const id = parseInt(request.params.id)
  const data = request.body;

  console.log(data);
  // data = { coords: [ 14.64827247, 121.0737752 ] }


  let x = data.coords[0]
  let y = data.coords[1]


  let query = `UPDATE tracker SET coords = '(${x},${y})' WHERE id = ${id}`;

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    } 
    let message = "goods"
    response.status(200).json(message)
  } )
  // why does this line break code??
  // response.status(200).json("not success :<")
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





*/


/*

[14.65945055,    121.0726833]
[14.64827247,    121.0737752]
[14.652349354571994, 121.06794118881227 ]
[14.652992357786058, 121.06233000755311]
[14.65764329,    121.062349]



===================================================
editing the coords of a jeep



UPDATE tracker SET coords = '(coords.x , coords.y)' WHERE id = 1;

*/


