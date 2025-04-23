const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.find({}).populate('blogs')
      res.json(users)
    } catch (error) {
      next(error)
    }
  })
  .post(async (req, res, next) => {
    try {
      const { firstName, lastName, dateOfBirth, userName, email, password, blogs } = req.body

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        userName: userName,
        email: email,
        passwordHash: passwordHash,
        blogs: blogs || []
      })
      const savedUser = await user.save()
      res.status(201).json(savedUser)
    } catch (error) {
      next(error)
    }
  })

userRouter.route('/:id')
  .delete(async(req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  })
  .put(async (req, res, next) => {
    try {
      let user = await User.findById(req.params.id)
      if(!user) return res.status(400).json({ error: 'user not found' })

      if (req.body.password) {
        const saltRounds = 10
        user.passwordHash = await bcrypt.hash(req.body.password, saltRounds)
      }

      user.firstName = req.body.firstName
      user.lastName = req.body.lastName
      user.userName = req.body.userName
      user.email = req.body.email
      user.dateOfBirth =  req.body.dateOfBirth
      user.blogs = req.body.blogs || []

      const updatedUser = await user.save()
      res.status(200).json(updatedUser)
    } catch (error) {
      next(error)
    }
  })


module.exports = userRouter