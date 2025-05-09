require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/phonebook')
const morgan = require('morgan')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('postData', (request) => {
  if (request.method === 'POST') return ' ' + JSON.stringify(request.body)
  else return ' '
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => res.json(result))
    .catch(error => {
      console.log(error)
      res.status(500).end()
    })
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${Person.countDocuments({})} people</p>
            <p>${date.toUTCString()}</p>`)
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if(!person) {
        return res.status(404).json({ error: 'Contact not found' })
      }
      res.json(person)
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).json({ error: 'person not found' })
      }
      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if(!body.name) {
    return res.status(400).json({ error: 'Name not entered' }).end()
  }
  else if (!body.number) {
    return res.status(400).json({ error: 'Number not entered' }).end()
  }
  else {
    Person.findOne({ name: body.name })
      .then(exists => {
        if (exists) {
          return res.status(400).json({ error: 'name must be unique' }).end()
        }

        const newPerson = new Person({
          name: body.name,
          number: body.number
        })

        return newPerson.save()

      })
      .then(result => res.status(201).json(result).end('added user'))
      .catch(error => {
        next(error)
      })
  }

})
app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body

  Person.findById(id)
    .then(person => {
      if (!person) {
        return res.status(404).json({ error: 'Contact not found' })
      }
      person.name = name
      person.number = number
      return person.save()
    })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.log(err)
  if(err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if(err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next()
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`App running on port: ${PORT}`)