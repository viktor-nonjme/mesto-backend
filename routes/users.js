const users = require('express').Router();

const userController = require('../controllers/users');

users.get('/users', userController.getUsers);
users.get('/users/:id', userController.getUserById);
users.post('/users', userController.createUser);
users.patch('/users/:userId', userController.updateUser);
users.patch('/users/:userId/avatar', userController.updateAvatar);

module.exports = users;
