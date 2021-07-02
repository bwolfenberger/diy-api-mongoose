// require mongoose package
const mongoose = require('mongoose')
require('dotenv').config()

const connect = () => {
    // define atlas URI
    const uri = process.env.ATLAS_URI
    
    // connect mongoose to atlas
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    const db = mongoose.connection

    db.once('open', () => {
        console.log(`mongoDB connection ${db.host}:${db.port}`)
    })

    db.on('error', err => {
        console.log(`datacenter is burning down!\n ${err}`)
    })
}
    
    // export function to connect
module.exports = {
    connect,
    Blog: mongoose.model('blog', require('./Blog.js'))
}