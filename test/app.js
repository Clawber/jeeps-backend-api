// npm install pg (not in node_modules in our case, in TypeScript local due to CS 150)
const { Client } = require('pg')

const connection = "postgres://admin:FWq5lKmt9n8rGtyDZoUPGuTkrR8XM7v6@dpg-cgtqnlt269vbmevdbd9g-a.singapore-postgres.render.com/jeeps?ssl=true"

// Also use connectionString key to circumvent SSL errors with ?ssl=true suffix
const client = new Client({
    host: "dpg-cgtqnlt269vbmevdbd9g-a.singapore-postgres.render.com",
    user: "admin",
    port: 5432,
    password: "FWq5lKmt9n8rGtyDZoUPGuTkrR8XM7v6",
    database: "jeeps",
    connectionString: connection
});

// TODO: For CRUD, vary query string and .query() listener function (this is only Read)
let jeepneyID = 1;

// TODO: Convert to pool

// Results are returned as JSON
// HERE: We will query database for coords of jeepneyID
function getCoords(jeepneyID, client) {
    client.connect();
    let queryString = `SELECT coords FROM tracker WHERE id = ${jeepneyID} ORDER BY id`;
    let coords;
    client.query(queryString, (err, res) => {
        // if (!err) {
        //     console.log(res.rows);
        //     coords = res.rows[0].coords;
        //     console.log("x = " + coords.x);
        //     console.log("y = " + coords.y);
        //     return([coords.x, coords.y])
        // } else {
        //     console.log(err.message);
        //     return false
        // }

        
        console.log(err ? err.stack : res.rows[0])
        client.end()
    })

}

// jeepney FKs are driver, route, and tracker.
// Hence, these must be `ideally` filled before jeepney is created.
// We say ideally because they are nullable.
function createJeep(driver, route, tracker, jeepney,  client) {
    let queryString;
    let [driverID, routeID, trackerID] = [null, null, null];
    let jeepneyID;  // will store return val
    if (driver != null) {
        client.connect();
        queryString = `INSERT INTO driver (firstName, lastName) 
                        VALUES ('${driver.firstName}', '${driver.lastName}')
                        SELECT max(id) FROM driver`;
        client.query(queryString, (err, res) => {
            if (!err) {
                console.log(res.rows);
                driverID = res.rows[0].id;
            } else {
                console.log(err.message);
            }
            client.end();
        })
    }
    if (route != null) {
        client.connect();
        queryString = `INSERT INTO route (name, color, path) 
                        VALUES ('${route.name}', ${route.color}, ${route.path});
                        SELECT max(id) FROM route`;
        client.query(queryString, (err, res) => {
            if (!err) {
                console.log(res.rows);
                routeID = res.rows[0].id;
            } else {
                console.log(err.message);
            }
            client.end();
        })
    }
    if (tracker != null) {
        client.connect();
        queryString = `INSERT INTO tracker (coords) VALUES ('(0, 0)');
                SELECT max(id) FROM tracker`;
        client.query(queryString, (err, res) => {
            if (!err) {
                console.log(res.rows);
                trackerID = res.rows[0].id;
            } else {
                console.log(err.message);
            }
            client.end();
        })
    }

    client.connect();
    queryString = `INSERT INTO jeepney (trackerID, routeID, driverID, plateNumber, capacity) 
                    VALUES (${driverID}, ${routeID}, ${trackerID}, '${jeepney.plateNumber}', ${jeepney.capacity})`;
    client.query(queryString)
        .then(() => client.query(`SELECT max(id) FROM jeepney`, (err, res) => {
            if (!err) {
                console.log(res.rows);
                jeepneyID = res.rows[0].max;
            } else {
                console.log(err.message);
            }
            client.end();
        }))
}

let jeepney = {plateNumber: 'SDJISS', capacity: 12}

// createJeep(null, null, null, jeepney, client);



getCoords(1, client)
