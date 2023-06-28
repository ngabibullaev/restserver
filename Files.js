const fs = require('fs');
const bodyParser = require('body-parser');

function Files(app) {
  // Подключаем middleware для обработки post-запросов
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Читаем данные из файла и преобразуем их в объект JavaScript
  app.get('/setting', (req, res) => {
    const fileData = fs.readFileSync('setting.json');
    const jsonData = JSON.parse(fileData);
    res.json(jsonData);
  });

  // Обработчик POST запроса
  app.post('/', (req, res) => {
    const { name, ratingIndex } = req.body;
    const data = { name, ratingIndex };

    // Проверяем, существует ли файл. Если файл не существует, создаем новый файл 
    if (!fs.existsSync('setting.json')) {
      fs.writeFileSync('setting.json', '[]');
    }

    // Читаем данные из файла и преобразуем их в объект JavaScript
    const fileData = fs.readFileSync('setting.json');
    const jsonData = JSON.parse(fileData);

    // Добавляем новые данные в массив объектов
    jsonData.push(data);

    // Записываем измененный массив данных обратно в файл
    fs.writeFile('setting.json', JSON.stringify(jsonData), function(err) {
      if (err) throw err;
      console.log('Data appended to setting.json');
      res.sendStatus(200);
    });
  });
}

module.exports = { Files };