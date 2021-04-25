const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
// Load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
// Load User model
const User = require('../../models/User')

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json({ errors, msg: errors[Object.keys(errors)[0]] })
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: 'A user with that email already exists' })
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json({ user, msg: 'User successfully created' }))
            .catch(err => res.json({ msg: 'Something went wrong when registering...' }))
        })
      })
    }
  })
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json({ errors, msg: errors[Object.keys(errors)[0]] })
  }
  const email = req.body.email
  const password = req.body.password
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ msg: 'Email not found' })
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
        }
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              user: { username: user.username, email: user.email },
              token,
            })
          }
        )
      } else {
        return res.status(400).json({ msg: 'Incorrect password' })
      }
    })
  })
})

router.get('/authenticate', async (req, res) => {
  try {
    let d = jwt.decode(req.query.token)
    if (!d) {
      return res.status(400).json({ success: false })
    }
    user = await User.findById(d.id)
    return res.status(200).json({ success: true, user: { username: user.username, email: user.email } })
  } catch (e) {
    return res.status(400)
  }
})

router.get('/all', async (req, res) => {
  const users = await User.find({}).exec()
  return res.status(200).json({ users })
})

module.exports = router
