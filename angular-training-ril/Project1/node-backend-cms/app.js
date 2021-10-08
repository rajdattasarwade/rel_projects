const express = require('express')
const path = require('path')
const indexRouter = require('./routes/index')
const app = express()
var bodyParser = require('body-parser')
var mongodbInstance = require('./utils/MongoDB/mongoDb');

/* GLOBAL VARIABLES */
global.q = require('q')
global.msgCodeJson = require('./utils/MsgCode/msgCode')
global.httpResponseHandlerError = require('./services/httpResponseHandler').httpResponseHandlerError
global.httpResponseSuccessHandler = require('./services/httpResponseHandler').httpResponseSuccessHandler

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/',indexRouter)

// error handler
app.use(function (err, req, res, next) {
    // res.locals.error = req.app.get('env') === 'development' ? err : {}
    // send the error
    res.status(err.status || 500)
    res.send(err.message)
})

mongodbInstance.connectDatabase(function( err, client ) {
    if (err) console.log(err);
})
/* SERVER START */
//const port = process.env.PORT || config.server.port
const port = 3000;
const server = app.listen(port)
