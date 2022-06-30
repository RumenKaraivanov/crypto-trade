const router = require('express').Router();
const coinService = require('../services/coin');

router.get('/', async (req, res) => {
    const coins = await coinService.getAllCoins();
    res.render('catalog', { title: 'Catalog Page - Crypto Web', coins });
});


module.exports = router;