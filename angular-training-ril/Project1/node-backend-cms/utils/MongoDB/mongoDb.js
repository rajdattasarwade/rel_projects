const mongoose = require('mongoose')
//const config = require('../../config/config')


function connectDatabase(){
    mongoose.connect('mongodb://127.0.0.1:27017/radmin', { useNewUrlParser: true , useUnifiedTopology: true})
    .then( () => {
        console.log('connected to radmin') 
    })
    .catch( (err) => {
        console.log('error while conecting') 
    }) 
}
module.exports = { connectDatabase };

