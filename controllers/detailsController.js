const router = require('express').Router();
const coinService = require('../services/coin');
const { isGuest } = require('../middlewares/guard');
const Coin = require('../models/Coin');

router.get('/:id', async (req, res) => {
    const user = req.user;
    const coin = await coinService.getCoinById(req.params.id);
    const isOwner = user && user._id === coin.ownerId._id.toString();
    const alreadyBougth = coin.buyCrypto.some(coin => coin._id.toString() === user?._id);

    res.render('details', { title: 'Details page', coin, isOwner, user, alreadyBougth });
});
router.get('/:id/buy', isGuest(), async (req, res) => {
    const coin = await Coin.findById(req.params.id);
    coin.buyCrypto.push(req.user._id);
    await coin.save();
    res.redirect(`/details/${req.params.id}`);
});


module.exports = router;