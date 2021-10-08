const mongoose = require('mongoose')
const config = require('../../config/config')


const pool = mongoose.connect('mongodb://localhost/playgroud')
.then( () => {
    console.log('connected') 
})
.catch( (err) => {
    console.log('error while conecting') 
}) 
