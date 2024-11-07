var express = require('express')

var router = express.Router()

const Users = require('../Controller/users.controller')

router.get('/', Users.index)

router.get('/:id', Users.detail)

router.post('/signup', Users.signup)

router.post('/login', Users.login);

router.put('/:userId/status', Users.updateUserStatus);


module.exports = router