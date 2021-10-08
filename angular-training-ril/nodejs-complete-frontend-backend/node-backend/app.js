//const express = require('express');
//const bodyParser = require('body-parser');

//const feedRoutes = require('./routes/feed');

//const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
//app.use(bodyParser.json()); // application/json

//app.use((req, res, next) => {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//    next();
//});

//app.use('/feed', feedRoutes);

//app.listen(8080);

var express = require('express');
var app = express();
var sql = require("mssql");

app.get('/', function (req, res) {
   
    

    // config for your database
    
    
    // connect to your database
    /*sql.connect(config, function (err) {
    
        if (err) {
        	console.log(err);
        } else {
        	console.log("connection done");
        }

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from VW_RR_OPIGNO', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });*/
});

var server = app.listen(5000, function () {
	var config = {
        user: 'BI_User',
        password: 'biuser@123',
        server: '10.131.44.40',
        port:43311, 
        database: 'LW_RR' 
    };

    sql.connect(config, function (err) {
    
        if (err) {
        	console.log(err);
        } else {
        	console.log("connection done");
        }

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from VW_RR_OPIGNO', function (err, recordset) {
            
            if (err) {
            	console.log(err);
            } else {
            	console.log(recordset);
            }

            // send records as a response
            //res.send(recordset);
            
        });
    });
    /*sql.connect(config, err => {
	    // ... error checks

	    const request = new sql.Request()
	    request.stream = true // You can set streaming differently for each request
	    request.query('select * from VW_RR_OPIGNO') // or request.execute(procedure)

	    request.on('recordset', columns => {
	        // Emitted once for each recordset in a query
	        console.log("recordset");
	    })

	    request.on('row', row => {
	        // Emitted for each row in a recordset
	        console.log("row");
	    })

	    request.on('error', err => {
	        // May be emitted multiple times
	        console.log("error");
	    })

	    request.on('done', result => {
	        // Always emitted as the last one
	        console.log("done");
	    })
	})

	sql.on('error', err => {
	    // ... error handler
	    console.log("error2");
	})*/
    console.log('Server is running fine..');
});