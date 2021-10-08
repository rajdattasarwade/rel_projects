const express = require('express')
const router = express.Router()

const userController = require('../controller/user');

/* GET home page. */
router.get('/ping', (req, res) => {
    res.status(200).send('pong')
})

router.post('/add/user', (req, res) => {
    userController.addUser(req, res);
})

router.post('/list/users', (req, res) => {
    userController.listUsers(req, res);
})

module.exports = router