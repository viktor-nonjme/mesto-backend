// Подключение библиотек из node_modules
const express = require('express');
const path = require('path');

// Подключение файлов проекта
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');

// Инициализация переменных
const app = express();
const PORT = process.env.PORT || 3000;

// Подключение роутеров
app.use(express.static(path.join(__dirname, 'public')));
app.use(users);
app.use(cards);
app.use(error);

// Запуск сервера на порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
