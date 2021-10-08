var express = require('express');
var app = express();
var sql = require("mssql");
var mysql = require("mysql2");
const https = require('https');
var request = require('request')
var cron = require('node-cron');

const username = "rradmin123";
const passw = "admin";

const options = {
    hostname: 'rruniversity.ril.com',
    path: '/api/onboard_user/scrum_users/apiinsert',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

const opts = {
    errorEventName:'error',
        logDirectory:'C:/xampp/htdocs/node-mssql-connect/logs', // NOTE: folder must exist and be writable...
        fileNamePattern:'scrum-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger( opts );

app.get('/', function (req, res) {});

cron.schedule('20 17 * * *', () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    let formatCurrDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    //console.log('Log File Testing ', formatCurrDate);
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
        var requestSql = new sql.Request();
        requestSql.stream = true;
        //var currQuery = "select * from VW_RR_OPIGNO where [Modified Date] between convert(date,dateadd(d,-1,getdate())) and convert(date,getdate())";
        var currQuery = "select * from VW_RR_OPIGNO WHERE [User Name] IN ('PPRR00167911','PPRR00191138','PPRR00191504','PPRR00191511','PPRR00192892','PPRR00192897','PPRR00192898','PPRR00192902','PPRR00192905','PPRR00192929','PPRR00192932','PPRR00192938','PPRR00192947','PPRR00192955','PPRR00193011','PPRR00193381','PPRR00193389','PPRR00193456','PPRR00194006','PPRR00194007','PPRR00194038','PPRR00194442','PPRR00194487','PPRR00194687','PPRR00194704','PPRR00194732','PPRR00194738','PPRR00194741','PPRR00194771','PPRR00196342','PPRR00196350','PPRR00196354') ORDER BY [User Name] ASC";
        // query to the database and get the records
        requestSql.query(currQuery);

        requestSql.on('recordset', columns => {
            // Emitted once for each recordset in a query
            //console.log(columns);
        })
        let reqUrl = "https://rruniversity.ril.com/api/onboard_user/scrum_users/apiinsert";
        //let reqUrl = "http://localhost/opigno_prod_org/?q=api/onboard_user/scrum_users/apiinsert";

        let rowsToProcess = [];
        requestSql.on('row', row => {
            console.log(row);
            rowsToProcess.push(row);
            if (rowsToProcess.length >= 2) {
                requestSql.pause();
                console.log('requestonRow hit');
                request.post({
                    url: reqUrl,
                    method: "POST", 
                    headers: {
                        'Authorization': 'Basic ' + new Buffer(username + ':' + passw).toString('base64')
                    },
                    json: rowsToProcess
                }, function(error, response, body) {
                    if(!error){
                        console.log("Response is here ");
                        console.log(body);
                        for(let val of body) {
                            log.info(val," ",formatCurrDate);
                        }
                        rowsToProcess = [];
                        requestSql.resume()
                    } else {
                        console.log("Error is here ");
                        console.log(error);
                    }
                })
                //processRows(rowsToProcess,requestSql);
            }
        });
        requestSql.on('done', () => {
            //console.log(rowsToProcess);
            console.log('requestonRow done');
            request.post({
                url: reqUrl,
                method: "POST", 
                headers: {
                    'Authorization': 'Basic ' + new Buffer(username + ':' + passw).toString('base64')
                },
                json: rowsToProcess
            }, function(error, response, body) {
                if(!error){
                    console.log("Response is here ");
                    console.log(body);
                    for(let val of body) {
                        log.info(val," ",formatCurrDate);
                    }
                    rowsToProcess = [];
                    requestSql.resume()
                } else {
                    //console.log("Error is here ");
                    //console.log(error);
                }
            })
            //processRows(rowsToProcess,requestSql);
        });
    
        requestSql.on('error', err => {
            // May be emitted multiple times
        })
    });
});

var server = app.listen(5000, function () {    
    console.log('Server is running fine..');
});
