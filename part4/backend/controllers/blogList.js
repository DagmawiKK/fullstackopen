const blogListRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogListRouter.route('/')
  .get(async (req, res, next) => {
    try {
      const result = await Blog.find({})
      res.json(result)
    } catch (error) {
      next(error)
    }
  })
  .post(async (req, res, next) => {
    const blog = req.body
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      tags: blog.tags || [],
      upvotes: blog.upvotes || 0,
      url: blog.url
    })

    if (!newBlog.title || !newBlog.url) return res.status(400).json({ error: 'Invalid input' })
    try {
      const saved = await newBlog.save()
      res.status(201).json(saved)
    } catch(error) {
      next(error)
    }
  })

blogListRouter.route('/:id')
  .get(async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id)
      if(blog) {
        res.json(blog)
      } else {
        logger.info(`Blog GET at id: ${req.params.id} failed`)
        res.status(404).json({ error: 'Blog not found' })
      }
    } catch(error) {
      next(error)
    }
  })
  .put(async (req, res, next) => {
    const { title, author, tags, upvotes, url } = req.body
    try {
      const blog = await Blog.findById(req.params.id)
      if(!blog) {
        return res.status(404).json({ error: 'Blog not found' })
      }

      blog.title = title
      blog.author = author
      blog.tags = tags
      blog.upvotes = upvotes
      blog.url = url

      const updatedBlog = await blog.save()
      if(updatedBlog) res.status(200).json(updatedBlog)
      else logger.info(`Blog PUT at id: ${req.params.id} failed`)
    } catch(error) {
      next(error)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
      res.status(204).json(deletedBlog)
    } catch (error) {
      next(error)
    }
  })


blogListRouter.get('/:author', async (req, res, next) => {
  try {
    const blogs = await Blog.find({ author: req.params.author })
    if(blogs) {
      res.json(blogs)
    } else {
      res.status(404).json({ error : 'Blogs by author not found' })
    }
  } catch(error) {
    next(error)
  }
})

blogListRouter.get('/:tags', (req, res, next) => {
  const selectedTags = req.params.tags.split(',')
  Blog
    .find({ tags: { $all: selectedTags } })
    .then(result => res.json(result))
    .catch(error => next(error))
})

module.exports = blogListRouter