const express = require("express");
const router = express.Router()

const pool = require('../config/db')




const getJeeps = (request, response) => {
  pool.query("SELECT * FROM tracker", (error, results) => {
    if (error) {
      throw error
    } 
    console.log(results.rows);
    response.status(200).json(results.rows)
  } )
}


const getJeepById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query("SELECT coords FROM tracker WHERE id = $1 ORDER BY id", [id], (error, results) => {
    if (error) {
      throw error
    } 
    console.log(results.rows);
    coords = results.rows[0].coords
    message = {"id":1,
          "coords": [coords.x, coords.y]
        }
    console.log(message);
    response.status(200).json(message)
  } )
}


const jeeps = [
  {id: 1, coords: [14.6575533,	121.0742258] }, 
  {id: 2, coords: [14.64728358,	121.0623173] }, 
]




// http://localhost:3000/api/jeeps/
router.get('/', getJeeps)
router.get('/:id', getJeepById)

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