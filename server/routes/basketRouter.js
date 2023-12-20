
const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');

router.post('/add-to-basket', basketController.addToBasket);
router.post('/remove-from-basket', basketController.removeFromBasket);
router.get('/get-basket', basketController.getBasket);

module.exports = router;