const express = require('express')

// require database
const db = require('./models')

// connect to db
db.connect()

// config express
const app = express()
const PORT = 3000

// middleware for req.body
app.use(express.urlencoded({ extended: false }))

// GET /blog show all blogs
app.get('/blog', (req, res) => {
    db.Blog.find({})
    .then((blog) => {
        res.send(blog)
        // res.json(blog)
    })
    .catch(err => console.log(err))
})
//async version
// app.get('/blog', async (req, res) => {
//     try {
//         const blogs = await db.Blog.find()
//         res.send(blogs)
//     } catch (err) {
//         console.log(err)
//     }
// })

// POST /blog create new blog then redirect to /blog
app.post('/blog', (req, res) => {
    db.Blog.create({
        name: req.body.name,
        title: req.body.title,
        content: req.body.content
    })
    .then(() => {
        res.redirect('/blog')
    })
    .catch(err => console.log(err))
})

// GET /blog/:id show specific blog details
app.get('/blog/:id', async (req, res) => {
    try {
        const foundBlog = await db.Blog.findById(req.params.id)
        res.send(foundBlog)
    } catch (err) {
        console.log(err)
    }
})

// PUT /blog/:id update specific blog
app.put('/blog/:id', (req, res) => {
    db.Blog.findById(req.params.id)
    .then((foundBlog) => {
        foundBlog.name = req.body.name,
        foundBlog.title = req.body.title,
        foundBlog.content = req.body.content    

        foundBlog.save()
            .then(() => {
                res.redirect('/blog')
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

// DELETE /blog/:id delete specific blog
app.delete('/blog/:id', async (req, res) => {
    try {
        deletedBlog = await db.Blog.findByIdAndRemove(req.params.id)
        console.log(deletedBlog)
        res.redirect('/blog')
    } catch (err) {
        console.log(err)
    }
})

app.listen(PORT, () => {
    console.log(`welcome to port ${PORT}`)
})