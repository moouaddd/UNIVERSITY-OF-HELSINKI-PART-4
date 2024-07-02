const blogsRouter = require('express').Router();
const Blog = require('../models/blog');  

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

blogsRouter.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
    .then(blog => {
        res.json(blog)
    })
})


blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))

  })

blogsRouter.delete('/:id', (req, res, next) => {
    
    Blog.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).end()
    })
    .catch(error => next(error))

})

blogsRouter.put('/:id', (req, res, next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    
    Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    .then(updatedBlog => {
        res.json(updatedBlog)
    }).catch(error => next(error))
})


module.exports = blogsRouter;