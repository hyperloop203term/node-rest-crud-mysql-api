var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

// default route
app.get('/', function (req, res) {
return res.send({ error: true, message: 'Welcome' })
});

// connection configurations
var Conn = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'node_js_api'
});

// connect to database
Conn.connect(); 

// Retrieve all users 
app.get('/users', function (req, res) {
Conn.query('SELECT * FROM users', function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'users list.' });
});
});

// Retrieve user with id 
app.get('/user/:id', function (req, res) {
let user_id = req.params.id;
if (!user_id) {
return res.status(401).send({ error: true, message: 'Please provide user_id' });
}
Conn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results[0], message: 'users list.' });
});
});

// Add a new user  
app.post('/user', function (req, res) {
let user = req.body.user;
if (!user) {
return res.status(402).send({ error:true, message: 'Provide user' });
}
Conn.query("INSERT INTO users SET ? ", { user: user }, function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'Created successfully.' });
});
});

//  Update user with id
app.put('/user', function (req, res) {
let user_id = req.body.user_id;
let user = req.body.user;
if (!user_id || !user) {
return res.status(403).send({ error: user, message: 'Please provide user and user_id' });
}
Conn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'Updated successfully.' });
});
});

//  Delete user
app.delete('/user', function (req, res) {
let user_id = req.body.user_id;
if (!user_id) {
return res.status(404).send({ error: true, message: 'Provide user_id' });
}
Conn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'updated successfully.' });
});
}); 

// set port
app.listen(3333, function () {
console.log('Runing Node on port : 3333');
});

module.exports = app;