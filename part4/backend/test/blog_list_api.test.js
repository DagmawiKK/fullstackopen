const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const blogListRouter = '/api/blogs'
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    'author': 'Mark Hemingway',
    'title': 'The Art of Simple Writing',
    'upvotes': 42,
    'url': 'https://www.markwrites.com/art-of-simple-writing',
    'tags': ['writing', 'style', 'clarity']
  },
  {
    'author': 'Jane Caldwell',
    'title': 'Why JavaScript Still Matters in 2025',
    'upvotes': 88,
    'url': 'https://www.techinsight.com/js-2025',
    'tags': ['javascript', 'webdev', 'programming']
  },
  {
    'author': 'Sofia Navarro',
    'title': 'Mindful Productivity: A Guide for Creatives',
    'upvotes': 67,
    'url': 'https://www.sofianavarro.blog/mindful-productivity',
    'tags': ['productivity', 'creativity', 'lifestyle']
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('bloglist api test', async () => {
  await api
    .get(blogListRouter)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get(blogListRouter)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get(blogListRouter)

  const titles = response.body.map(e => e.title)
  assert.strictEqual(titles.includes(initialBlogs[0].title), true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'Doesteovsky',
    title: 'The idiot',
    upvotes: 200,
    url: 'https://theidoit.com',
    tags: ['fiction', 'literature']
  }
  await api
    .post(blogListRouter)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get(blogListRouter)
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  initialBlogs.push(newBlog)
  const titles = response.body.map(blog => blog.title)
  assert(titles.includes(newBlog.title))
})

test('a blog with no upvotes can be added with default value 0', async () => {
  const newBlog = {
    author: 'tolstoy',
    title: 'The something',
    url: 'https://theidoit.com',
    tags: ['fiction', 'literature']
  }
  await api
    .post(blogListRouter)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get(blogListRouter)
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  initialBlogs.push(newBlog)
  const blog = response.body.find(blog => blog.title === newBlog.title)
  assert(blog.upvotes === 0)
})

test('a blog with no title or url can not be added', async () => {
  const newBlog = {
    title: 'The somethingu',
    url: 'https://theidoit.com',
    tags: ['fiction', 'literature']
  }
  await api
    .post(blogListRouter)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get(blogListRouter)
  const blog = response.body.find(blog => blog.title === newBlog.title)
  assert(!blog)
})
after(async () => {
  await mongoose.connection.close()
})
