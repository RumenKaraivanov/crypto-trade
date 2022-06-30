const router = require('express').Router();
const { isGuest } = require('../middlewares/guard');
const errorMapper = require('../services/error');
const coinService = require('../services/coin');


router.get('/:id', isGuest(), async (req, res) => {
    const coin = await coinService.getCoinById(req.params.id);
    coin[`select${coin.payment}`] = true;
    console.log(coin)
    res.render('edit', { title: 'Edit Page', coin });
});
router.post('/:id', isGuest(), async (req, res) => {

    const { name, price, description, imageUrl, payment } = req.body;
    const isEmpty = Object.values(req.body).some(v => v == '');


    try {

        if (isEmpty) {
            throw new Error('All fields are required!');
        };
        await coinService.updateCoin(req.params.id, { name, price, description, imageUrl, payment });

        res.redirect(`/details/${req.params.id}`);

    } catch (err) {
        const errors = errorMapper(err);

        const coin = {
            _id: req.params.id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            payment: req.body.payment,
            imageUrl: req.body.imageUrl
        };
        return res.render('edit', { title: 'Edit Page', coin, errors });
    };
});
router.get('/:id/delete', isGuest(), async (req, res) => {
    const id = req.params.id;
    await coinService.deleteCoin(id);
    res.redirect('/catalog');
});
module.exports = router;