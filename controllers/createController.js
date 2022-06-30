const router = require('express').Router();
const { isGuest } = require('../middlewares/guard');
const errorMapper = require('../services/error');
const coinService = require('../services/coin');
const userService = require('../services/user');

router.get('/', isGuest(), (req, res) => {

    res.render('create', { title: 'Create Page' });
});
router.post('/', isGuest(), async (req, res) => {

    const { name, price, description, imageUrl, payment } = req.body;
    const isEmpty = Object.values(req.body).some(v => v == '');
    const user = await userService.getUserByEmail(req.user.email);

    try {

        if (isEmpty) {
            throw new Error('All fields are required!');
        };
        await coinService.createCoin({ name, price, imageUrl, description, payment, ownerId: user._id.toString() });
        res.redirect('/catalog');

    } catch (err) {
        const errors = errorMapper(err);
        const data = {
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl,
            payment: payment
        };
        return res.render('create', { title: 'Create Page', data, errors });
    };
});

module.exports = router;