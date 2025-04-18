const { describe, test } = require('node:test')
const assert = require('node:assert')
const favoriteBlog = require('../for_testing/favorite_blog')

describe('Favorite blog', () => {
  test('when there is no liked blog', () => {
    assert.deepStrictEqual(favoriteBlog([]), null)
  })

  test('where there are multiple blogs', () => {
    const listWithMultipleBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 15,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 10,
        __v: 0
      }
    ]
    assert.deepStrictEqual(favoriteBlog(listWithMultipleBlog), listWithMultipleBlog[1])
  })
})