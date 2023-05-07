const { Pool } = require('pg');


const connection = "postgres://admin:FWq5lKmt9n8rGtyDZoUPGuTkrR8XM7v6@dpg-cgtqnlt269vbmevdbd9g-a.singapore-postgres.render.com/jeeps?ssl=true"


const pool = new Pool({
  host: "dpg-cgtqnlt269vbmevdbd9g-a.singapore-postgres.render.com",
  user: "admin",
  port: 5432,
  password: "FWq5lKmt9n8rGtyDZoUPGuTkrR8XM7v6",
  database: "jeeps",
  connectionString: connection
})

module.exports = pool;