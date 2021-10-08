const fs = require('fs');

const requestHandler = (req, res) => {
    const requrl = req.url;
    const reqmethod = req.method;

    if(requrl==="/"){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(requrl=="/message" && reqmethod=="POST"){
        const body = [];
        req.on('data', (chunk)=>{
            body.push(chunk);
        });
        return req.on('end',()=>{
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
                fs.writeFile('message.txt', message, err => {
                    res.statusCode = 302;
                    res.setHeader('Location','/');
                    return res.end();
                });
            });
        }

        res.setHeader('Content-type','text/html');
        res.write('<html>');
        res.write('<head><title>My Node JS First App</title></head>');
        res.write('<body><h1>My node js first app ready !</h1></body>');
        res.write('</html>');
        res.end();
    }


//module.exports = requestHandler;

//module.exports = {
//    handler: requestHandler,
//    someText: "Some text display"
//}

//module.exports.handler = requestHandler;
//module.exports.someText = "Some text display";

exports.handler = requestHandler;
exports.someText = "Some text display";