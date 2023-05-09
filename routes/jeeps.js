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

// Bug TODO
const getJeepById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(`SELECT coords FROM tracker WHERE id = ${id} ORDER BY id`, (error, results) => {
    if (error) {
      throw error
    } 
    console.log(results.rows);
    coords = results.rows[0].coords
    message = {"id": id,
          "coords": [coords.x, coords.y]
        }
    console.log(message);
    response.status(200).json(message)
  } )
}







// http://localhost:3000/api/jeeps/
router.get('/', getJeeps)
router.get('/:id', getJeepById)



// json data 
// {"coords": [14.64827247,121.0737752]}
router.post('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const data = request.body;
  // data = { coords: [ 14.64827247, 121.0737752 ] }

  console.log(data.coords);
  console.log(data.coords[0]);


  let x = data.coords[0]
  let y = data.coords[1]


  let query = `UPDATE tracker SET coords = '(${x},${y})' WHERE id = ${id}`;

  console.log(query);

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    } 
    let message = "goods"
    response.status(200).json(message)
  } )



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


