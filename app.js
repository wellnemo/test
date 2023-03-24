const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

// server css as static
app.use(express.static(__dirname));

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/getinn", (req, res) => {
	
	
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'inn'
});
connection.connect(function(err) {
  // connected! (unless `err` is set)
});

connection.query("SELECT * FROM inn where inn = "+req.body.inn,
  function(err, results, fields) {
    //console.log(err);
    console.log(results); // собственно данные
    //console.log(fields); // мета-данные полей 
	res.send(results);
});


	
});

app.post("/saveinn", (req, res) => {

 var mysql      = require('mysql');
 var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'inn'
});
connection.connect(function(err) {
  // connected! (unless `err` is set)
});

if(req.body.value != '{"suggestions":[]}'){
const data = [req.body.inn, req.body.value];
const sql = "INSERT INTO inn(inn, value) VALUES(?, ?)";
 
connection.query(sql, data, function(err, results) {
    if(err) console.log(err);
    else console.log("Данные добавлены");
});
 }


});