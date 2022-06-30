const router = require('express').Router();
const { isGuest } = require('../middlewares/guard');
const coinService = require('../services/coin');

router.get('/', isGuest(), async (req, res) => {
    console.log(req.query)
    let methods = {};
    methods[`select${req.query.payment}`] = true;
    let searched = req.query.search;
    const coins = await coinService.getSearched(req.query)
    console.log(coins)
    res.render('search', { title: 'Search', searched, methods, coins });
});
module.exports = router;