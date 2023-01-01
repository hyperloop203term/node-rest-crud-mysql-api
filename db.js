
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

// connection configurations
 var Conn = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'node_js_api'
 });
 
 // connect to database
 Conn.connect(); 