const totalLikes = (blogs) => {
  let total = 0
  for (let blog of blogs) {
    total += blog.likes
  }
  return total
}

module.exports = totalLikes