const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  let authorsMap = new Map()
  let max = blogs[0].author

  blogs.forEach(blog => {
    let val = (authorsMap.get(blog.author) || 0) + 1
    authorsMap.set(blog.author, val)
    if (authorsMap.get(max) < val) max = blog.author
  })

  return { author : max, blogs: authorsMap.get(max) }
}

module.exports = mostBlogs