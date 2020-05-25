// Подключение библиотек из node_modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors, celebrate } = require('celebrate');

// Подключение файлов проекта
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');
const userController = require('./controllers/users');
const { authorization } = require('./middlewares/auth');
const { loginSchema } = require('./joi-shemas/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Инициализация переменных
const app = express();
app.use(helmet());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// подключаем логгер запросов
app.use(requestLogger);

app.post('/signin', celebrate({ body: loginSchema }), userController.login);
app.post('/signup', userController.createUser);

// Подключение роутеров
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
  useUnifiedTopology: true
});

// подключаем логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    const { statusCode = 500, message } = err;

    res.status(statusCode).send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  }
  return res.status(err.statusCode).send({ message: err.message });
});
