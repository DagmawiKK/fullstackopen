const { describe, test, after, beforeEach, before } = require('node:test')
const assert = require('assert')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  const rootUser = {
    firstName: 'root',
    lastName: 'root',
    userName: 'root',
    email: 'root@gmail.com',
    dateOfBirth: '06 23 1999'
  }
  let userHashedPassword

  before(async () => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('password123', saltRounds)
    userHashedPassword = await bcrypt.hash('password1234', saltRounds)
    rootUser.password = passwordHash
  })

  beforeEach(async () => {
    await User.deleteMany({})
    await new User(rootUser).save()
  })

  test('creating new user with valid fields', async () => {
    const usersBeforeAddition = await User.find({})

    const validUser = {
      firstName: 'user1',
      lastName: 'user1',
      userName: 'user1',
      email: 'user1@gmail.com',
      dateOfBirth: '06 23 1998',
      password: userHashedPassword,
    }

    await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    const usersAfterAddition = users.map(user => user.userName)
    assert(usersAfterAddition.includes(validUser.userName))
    assert.strictEqual(usersAfterAddition.length, usersBeforeAddition.length + 1)
  })

  test('creating user with duplicate userName', async () => {
    const usersBeforeAddition = await User.find({})

    const invalidUser = {
      firstName: 'user',
      lastName: '2',
      userName: 'user1',
      email: 'user2@gmail.com',
      dateOfBirth: '06 23 1998',
      password: userHashedPassword,
    }

    await api
      .post('/api/users/')
      .send(invalidUser)
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const users = await User.find({})
    const usersAfterAddition = users.map(user => user.userName)

    assert.strictEqual(usersAfterAddition.length, usersBeforeAddition.length)
  })

  after(() => {
    mongoose.disconnect()
  })
})
