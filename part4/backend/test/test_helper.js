const User = require('../models/user')
const Blog = require('../models/blog')

const getUserNames = async () => {
  const users = await User.find({})
  return users.map(user => user.userName)
}

const getBlogTitles = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.title)
}

module.exports = { getUserNames, getBlogTitles }