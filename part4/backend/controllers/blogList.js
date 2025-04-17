const blogListRouter = require('express').Router()
const Blog = require('../models/blog')

blogListRouter.get('/', (req, res, next) => {
  Blog
    .find({})
    .then((result) => res.json(result))
    .catch(error => next(error))
})

blogListRouter.get('/:id', (req, res, next) => {
  Blog
    .findById(req.params.id)
    .then(result => {
      if (result) res.json(result)
      else {
        res.status(404).json({ error: 'Blog not found' })
      }
    })
    .catch(error => next(error))
})

blogListRouter.get('/:author', (req, res, next) => {
  Blog
    .find({ author: req.params.author })
    .then(result => res.json(result))
    .catch(error => next(error))
})

blogListRouter.get('/:tags', (req, res, next) => {
  const selectedTags = req.params.tags.split(',')
  Blog
    .find({ tags: { $all: selectedTags } })
    .then(result => res.json(result))
    .catch(error => next(error))
})

blogListRouter.post('/', (req, res, next) => {
  const blog = req.body
  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    tags: blog.tags || [],
    upvotes: blog.upvotes,
    url: blog.url
  })

  newBlog
    .save()
    .then(savedBlog => res.json(savedBlog))
    .catch(error => next(error))
})

blogListRouter.put('/:id', (req, res, next) => {
  const { title, author, tags, upvotes, url } = req.body
  Blog
    .findById(req.params.id)
    .then(blog => {
      if(!blog) return res.status(404).json({ error: 'Blog not found' })

      blog.title = title
      blog.author = author
      blog.tags = tags
      blog.upvotes = upvotes
      blog.url = url

      blog
        .save()
        .then(updatedBlog => res.status(200).json(updatedBlog))
        .catch(error => next(error))
    })
})

blogListRouter.delete('/:id', (req, res, next) => {
  Blog
    .findByIdAndDelete(req.params.id)
    .then(deletedblog => res.status(204).json(deletedblog))
    .catch(error => next(error))
})

module.exports = blogListRouter