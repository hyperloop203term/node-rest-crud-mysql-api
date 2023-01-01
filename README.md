<pre>
# node-rest-crud-mysql-api
node-rest-crud-mysql-api , You can lean easy follow this step
 SPTE 1 - Prepare git directory
 Step 2 – Create Database table and Insert data
 Step 3 – Connect Node Application to database in db.js
 Step 4 – Create Rest Apis and Add in index.js
 Step 5 – POSMAN used for cheking message
 Step 6 – Start Development Server
</pre>

<pre>
 SPTEP 1. Create Node && Git Directory 
         - git init -y
         - install node js, and check version use >> node --version
         - install node-modules , npm install express mysql mysql2 cors body-parsher
         - git add .
         - git commit -m 'reason why do that message'
         - git push origin         
</pre>

<pre>
 SPTEP 2. Create Database table and Insert data
  ====================================
        Table structure for users
  =====================================
  CREATE TABLE IF NOT EXISTS users (
    id         int(11)      NOT NULL,
    name       varchar(200) NOT NULL,
    address    varchar(200) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  ALTER TABLE users ADD PRIMARY KEY (id);
  ALTER TABLE users MODIFY id int(11) NOT NULL AUTO_INCREMENT;

</pre>

<pre>
 SPTEP 3. Connect Node Application to database in db.js

    ===============================================
    create database connection test in db.js
    ========================================
    
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


    ========================================
    Insert data into Table users with mysql command

    ==========================================
    INSERT INTO users (id, name, address, created_at,update_at) VALUES
    (1, 'hyperloop', 'hyper@gm.mail', '2019-02-28 13:20:20','2019-02-28 13:20:20'),
    (2, 'leo','leo@gm.mail', '2019-02-28 13:20:20','2019-02-28 13:20:20'),
    (3, 'sake', 'sake@gm.mail', '2019-02-28 13:20:20','2019-02-28 13:20:20'),
    (4, 'waru', 'waru@gm.mail', '2019-02-28 13:20:20','2019-02-28 13:20:20'),
    (5, 'aki', 'akiooo@gmail.co', '2019-02-28 13:20:20','2019-02-28 13:20:20');

     //data is preparing for insert into users table.

</pre>

<pre>
 SPTE 4. Create Rest Apis and Add in index.js
        

    //Variable is declear 
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var mysql = require('mysql');

    //prepare JSON format send to HTTP file
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
    extended: true
    }));

    // set default route 
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

</pre>

<pre>
 SPTE 5. we can user Web browser and POSMAN software for cheking node js message
       5.1 web 
           - View all data use   http://localhost:3333/users/
           - Query a record use  http://localhost:3333/user/1
           - Post  a record use  http://localhost:3333/user/ [data package]
</pre>
       ![rest-api](https://user-images.githubusercontent.com/121533968/210177669-b5ac59de-17f4-41d0-9854-03b88fa64014.jpg) 
<pre>

       5.2 postman software
</pre>

<pre>
 Step 6 – Start Development Server
</pre>


