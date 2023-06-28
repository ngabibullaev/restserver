const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// импортируем код из Bot.js
const {Bot} = require("./bot")
Bot(app);

const {Files} = require("./Files")
Files(app);

// Запуск сервера
app.listen(4444, () => {
  console.log('старт сервера на порту 4444');
});