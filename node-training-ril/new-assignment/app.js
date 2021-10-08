const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req,res, next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
});

/*app.use("/users",(req, res , next)=>{
    console.log("in the users middleware");
    res.send("<h1>In the users middleware</h1>");
})*/

/*app.use("/",(req, res, next)=>{
    console.log("in the second middleware");
    res.send("<h1>In the second middleware</h1>");
})*/

app.listen(4000);