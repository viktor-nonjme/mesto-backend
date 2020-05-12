// Подключение библиотек из node_modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Подключение файлов проекта
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');
const userController = require('./controllers/users');
const { authorization } = require('./middlewares/auth');

// Инициализация переменных
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signin', userController.login);
app.post('/signup', userController.createUser);
// Подключение роутеров
app.use(express.static(path.join(__dirname, 'public')));
app.use(authorization);
app.use(users);
app.use(cards);
app.use(error);

// Запуск сервера на порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // eslint-disable-next-line prettier/prettier
  useUnifiedTopology: false
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    console.error(err.stack || 500);
  }
  return res.status(status).send({ message: err.message });
});
