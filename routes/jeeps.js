const express = require("express");
const router = express.Router()


// kalat, wala munang database


const jeeps = [
  {id: 1, coords: [14.6575533,	121.0742258] }, 
  {id: 2, coords: [14.64728358,	121.0623173] }, 
]

/*




*/


router.get('/', (req, res) => {
  res.send(jeeps);
});

router.get('/:id', (req, res) => {
  const jeep = jeeps.find(c => c.id === parseInt(req.params.id));

  if (!jeep) {
    res.status(404).send('The jeep with the given ID was not found')
  }
  res.send(jeep);
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