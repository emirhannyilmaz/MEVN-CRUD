var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
	host: 'localhost',
	port: '8889',
  	user: 'root',
  	password: 'root',
  	database: 'crud'
});

con.connect(function(err) {
	if (err)
		throw err;

	console.log('Connected to database!');
});

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080, function () {
  console.log('Server running...');
});

app.post('/create', function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var age = req.body.age;

  var sql = 'INSERT INTO users (username, email, age) VALUES ?';
  var values = [
    [username, email, age]
  ];
  con.query(sql, [values], function (err, result) {
    	if (err)
    		throw err;
    	res.send(result);
  });
});

app.get('/list', function (req, res) {
	var sql = 'SELECT * FROM users';
	con.query(sql, function (err, result, fields) {
  	if (err)
  		throw err;
  	res.send(result);
	});
});

app.put('/update/:id', function (req,res) {
  var sql = "UPDATE users SET username = ?, email = ?, age = ? WHERE id = ?";
  con.query(sql, [req.body.username, req.body.email, req.body.age, req.params.id], function (err, result) {
    if (err)
      throw err;
  });
});

app.delete('/delete/:id', function (req, res) {
	var sql = 'DELETE FROM users WHERE id = ' + req.params.id;
  con.query(sql, function (err, result) {
  	if (err)
  		throw err;
  	res.send(result);
	});
});