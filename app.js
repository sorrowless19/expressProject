const express = require('express')
const app = express()
const port = 3001
const con = require('./DatabaseConnection/dbConnection')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

//header 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
  });
  //body-parser setup
  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())
//jwt express

app.use(cookieParser())
  //DatabaseConnection
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
//routes
  const routes = require("./routes/routes");
  app.use("/", routes);
  //server listen on 3001 port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))