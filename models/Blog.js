// require mongoose package
const mongoose = require('mongoose')

// define mongoose schema
const BlogSchema = new mongoose.Schema({
    name: String,
    title: String,
    content: String,
}, {
    timestamp: true
})

// build model from schema
module.exports = BlogSchema