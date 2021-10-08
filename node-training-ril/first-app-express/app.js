//const http = require('http');
const express = require('express');

const app = express();

app.use("/add-product",(req, res, next) => {
    console.log("In add product page");  
    res.send("<h1>The add product page</h1>");
})

app.use("/",(req, res, next) => {
    console.log("In another middleware");  
    res.send("<h1>Hello from express js</h1>");
})

//const createServer = http.createServer(app);
//createServer.listen(3000);

app.listen(3000);