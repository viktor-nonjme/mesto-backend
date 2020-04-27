const users = require('express').Router();

const usersData = require('../data/user.json');

users.get('/users', (req, res) => {
  res.send(usersData);
});

users.get('/users/:id', (req, res) => {
  const userIsFind = usersData.find(user => user._id === req.params.id);

  if (userIsFind) res.send(userIsFind);
  else res.status(404).send({ message: 'Нет пользователя с таким id' });
});

module.exports = users;
