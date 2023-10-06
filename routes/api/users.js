const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql2');



// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodelab',
    password: "P@ssw0rd",
    database: 'lab_nodejs'
});

app.use(express.json());

router.get('/', function (req, res) {
    // simple query
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            res.json(results);
            //console.log(results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
        }
    );

});

router.get('/:id', function (req, res,next) {

    connection.query(
        `SELECT * FROM users where id = ?`, 
        [req.params.id],
        function (err, results, fields) {
            res.json(results);
            //console.log(results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
        }
    );

});

//create
router.post('/', function (req, res,next) {
    
    connection.query(
        'INSERT INTO `users`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?,?,?,?,?)',
        [req.body.fname,req.body.lname,req.body.username,req.body.password,req.body.avatar],
        function (err, results) {
            res.json(results);
            console.log(err);
            //console.log(results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
        }
    );

});

//update
router.put('/', function (req, res,next) {
    
    connection.query(
        'UPDATE `users` SET `fname`=?,`lname`=?,`password`=?,`avatar`=? WHERE id=?',
        [req.body.fname,req.body.lname,req.body.password,req.body.avatar,req.body.id],
        function (err, results) {
            res.json(results);
            console.log(err);
            //console.log(results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
        }
    );
});

//delete
router.delete('/:id', function (req, res,next) {
    
    connection.query(
        'DELETE FROM `users` WHERE id=?',
        [req.params.id],
        function (err, results) {
            res.json(results);
            console.log(err);
            //console.log(results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
        }
    );
});



module.exports = router;
