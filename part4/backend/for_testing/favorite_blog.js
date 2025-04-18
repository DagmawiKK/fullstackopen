const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  let max = blogs[0]
  blogs.map(blog => {
    if (blog.likes > max.likes) max = blog
  })
  return max
}

module.exports = favoriteBlog