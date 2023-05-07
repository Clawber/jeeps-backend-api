// pg code start
// ----------------------------------------------
// npm install pg (not in node_modules in our case, in TypeScript local due to CS 150)

const connection = "postgres://admin:FWq5lKmt9n8rGtyDZoUPGuTkrR8XM7v6@dpg-cgtqnlt269vbmevdbd9g-a.singapore-postgres.render.com/jeeps?ssl=true"

// Also use connectionString key to circumvent SSL errors with ?ssl=true suffix
const pool = new Pool({
    host: "dpg-cgtqnlt269vbmevdbd9g-a.singapore-postgres.render.com",
    user: "admin",
    port: 5432,
    password: "FWq5lKmt9n8rGtyDZoUPGuTkrR8XM7v6",
    database: "jeeps",
    connectionString: connection
});

client.connect()

let jeepneyID = 1;

// ----------------------------------------------
// pg code end



const express = require("express");
const router = express.Router()


// kalat, wala munang database


const jeeps = [
  {id: 1, coords: [14.6575533,	121.0742258] }, 
  {id: 2, coords: [14.64728358,	121.0623173] }, 
]

/*




*/


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