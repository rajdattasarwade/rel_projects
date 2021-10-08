const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index')
const config = require('./config/config')
const getUrlPrefix = config.app.prefix
const cors = require('cors')
const app = express()
const request = require('request');
var bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
// const verifyTokenController = require('./controller/verifyToken')
const session = require('express-session')
var swaggerJson = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');
// swagger definition
app.use('/swagger-ui.html', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.get('/v2/api-docs', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerJson);
});

/* GLOBAL VARIABLES */
global.q = require('q')
global._ = require('underscore')
global.connectDatabase = require('./utils/MySQL/dbConn').connectDatabase
global.cryptoJs = require('crypto-js')
global.secretkey = '123456$#@$^@1ERF'
global.dbQuery = require('./model/MySQLQuery/mySqlQuery')
global.msgCodeJson = require('./utils/MsgCode/msgCode')
global.httpResponseHandlerError = require('./services/httpResponseHandler').httpResponseHandlerError
global.httpResponseSuccessHandler = require('./services/httpResponseHandler').httpResponseSuccessHandler
global.httpResponseHandler = require('./services/httpResponseHandler').httpResponseHandler
global.httpResponseDetailsHandler = require('./services/httpResponseHandler').httpResponseDetailsHandler
global.setPernr = require('./services/common').setPernr
global.getPernr = require('./services/common').getPernr
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const sessionOptions = {
  secret: config.app.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000, secure: false, httpOnly: true }
}

app.use(session(sessionOptions))

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }))

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
/* app.use((req, res, next) => {
  try {
    if (!req.headers.cookie || !req.headers.userid) {
      return res.json({
        "status": 'failure',
        "message": "Please send a valid request"
      });
    }
    if (req.headers.userid) {

      try {
        var options = {
          'method': 'GET',
          'url': "http://10.128.79.196/sap/opu/odata/sap/ZHR_OS_SRV/GetNUserProfileSet(ImUser='X')",
          'headers': {
            'Accept': 'application/json',
            'cookie': req.headers.cookie
          }


        };
        var user = request(options,
          function (err, response, body) {

            if (!err && response.statusCode == 200) {
              var parsedJsonData = JSON.parse(body);
              if (parsedJsonData.d.Pernr == req.headers.userid) {
                next();
              } else {
                httpResponseHandlerError(res, msgCodeJson.ERR009.code, { "message": 'Unauthorized user' })
              }

            } else {
              console.log(err);
              return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
              })
            }
          });
      } catch (error) {
        console.log(error);
        httpResponseHandlerError(res, msgCodeJson.ERR009.code, msgCodeJson.ERR009.msg);
      }
    }
  } catch (error) {
    return res.json({
      "status": 'failure',
      "message": "Error in processing"
    });
  }
}); */

app.use('/', indexRouter)


// error handler
app.use(function (err, req, res, next) {
  // res.locals.error = req.app.get('env') === 'development' ? err : {}
  // send the error
  console.log(err.status);
  res.status(err.status || 500)
  res.send(err.message)
})

/* SERVER START */
const port = process.env.PORT || config.server.port
const server = app.listen(port)
console.log('Api is running on port', port)
console.log('Url prefix is', getUrlPrefix)
console.log(`try this url http://localhost:${port}${getUrlPrefix}/ping`)

module.exports = app



