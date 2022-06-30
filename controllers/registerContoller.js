const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { isUser } = require('../middlewares/guard');
const errorMapper = require('../services/error');

router.get('/', isUser(), (req, res) => {

    res.render('register', { title: 'Register Page - Crypto Web' });
});
router.post('/', isUser(), async (req, res) => {

    const { email, username, password, rePassword } = req.body;
    try {
        if (email == '' || username == '' || password == '' || rePassword == '') {
            throw new Error('All fields are required!');
        };
        if (password !== rePassword) {
            throw new Error('Password doesnt match');
        };

        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({ email, username, hashedPass });
        await user.save();

        const userViewModel = { _id: user._id, email: user.email, username: user.username };
        const token = jwt.sign(userViewModel, 'my very secure secret');
        res.cookie('SESSION_DATA', token, { httpOnly: true });
        req.user = userViewModel;

    } catch (err) {
        const errors = errorMapper(err);
        const data = {
            email: req.body.email,
            username: req.body.username
        };
        return res.render('register', { title: 'Register Page', data, errors });
    };

    return res.redirect('/');
});

module.exports = router;