const mongoose = require('mongoose')

mongoose
  .connect('mongodb+srv://dagmawikassa1:Bleach1234@cluster0.gmytnbh.mongodb.net/testBlogList?retryWrites=true&w=majority&appName=Cluster0')
  .then(console.log('connected'))

mongoose.set('strictQuery', false)

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  author: {
    type: String,
    required: true,
    minlength: 3
  },
  upvotes: Number,
  url: {
    type: String,
    required: true,
    minlength: 5
  },
  tags: Array,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

if (process.argv.length <= 2) {
  Blog
    .find({})
    .then(result => {
      result.forEach(res => console.log(res))
      mongoose.connection.close()
    })
    .catch(error => (console.log('error: ', error.message)))
}
else {
  const input = JSON.parse(process.argv[2])
  const newBlog = new Blog({
    author: input.author,
    title: input.title,
    upvotes: input.upvotes || 0,
    url: input.url,
    tags: input.tags || []
  })
  newBlog
    .save()
    .then( () => {
      console.log('saved')
      mongoose.connection.close()
    })
}