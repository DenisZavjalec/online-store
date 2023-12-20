const {Basket} = require('../models/models')
const {BasketDevice} = require('../models/models')
const Device = require('../models/models');

exports.addToBasket = async (req, res) => {
    try {
        const { userId, deviceId, quantity } = req.body;

        const basket = await Basket.findOrCreate({
            where: { userId },
            defaults: { userId },
        });

        const [basketDevice, created] = await BasketDevice.findOrCreate({
            where: { basketId: basket[0].id, deviceId },
            defaults: { basketId: basket[0].id, deviceId, quantity },
        });

        if (!created) {
            // Если запись уже существует, увеличьте количество
            basketDevice.quantity += quantity;
            await basketDevice.save();
        }

        res.status(201).json({ message: 'Устройство добавлено в корзину' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.removeFromBasket = async (req, res) => {
    try {
        const { userId, deviceId } = req.body;

        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return res.status(404).json({ message: 'Корзина не найдена' });
        }

        await BasketDevice.destroy({ where: { basketId: basket.id, deviceId } });

        res.status(200).json({ message: 'Устройство видалено з корзини' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.getBasket = async (req, res) => {
    try {
        const { userId } = req.body;

        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return res.status(404).json({ message: 'Корзина не найдена' });
        }

        const basketDevices = await BasketDevice.findAll({
            where: { basketId: basket.id },
            include: Device, // Включаем информацию об устройствах
        });

        res.status(200).json({ basketDevices });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};