const axios = require('axios');

function Bot(app) {
    // Настройки бота
    const botToken = '6062410444:AAGuFpznVi1YufzraUy2ed4kXXcdt_7-vGg'; //токен

    // Генератор рандомных чисел
    const randomNum = Math.floor(Math.random() * 999999);

    // Обработчик POST-запроса для отправки сообщения
    app.post('/sendMessage', (req, res) => {
        const chatId = -1001962415871; // айди чата
        const messageText = `👁‍🗨 ЧЕК: №${randomNum}\n\n👤 Имя: ${req.body.isName}\n📞 Номер: ${req.body.number}\n🏘 Улица: ${req.body.region}\n🏠 Дом: ${req.body.home}\n🏢 Корпус: ${req.body.house}\n🏚 Этаж: ${req.body.floor}\n🏬 Квартира: ${req.body.apartment}\n💬 Комментарий: ${req.body.comment}\n\n\n🥧 Заказ: ${req.body.totalCount}\n${req.body.text}\n\n\n💸 Итого: ${req.body.totalPrice} ₽`;

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const data = { chat_id: chatId, text: messageText };

        axios.post(telegramUrl, data)
            .then(() => {
                console.log(`сообщение отправлено ${chatId}: ${messageText}`);
                res.send({ success: true });
            })
            .catch((error) => {
                console.error(`сообщение не отправлено ${chatId}: ${error}`);
                res.status(500).send({ success: false, error: error.message });
            });
    });

    // Обработчик ошибок
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send({ success: false, error: err.message });
    });
}

module.exports = { Bot }

// 6062410444:AAGuFpznVi1YufzraUy2ed4kXXcdt_7-vGg

// -1001962415871