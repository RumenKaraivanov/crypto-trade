const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const { isUser } = require('../middlewares/guard');
const errorMapper = require('../services/error');

router.get('/', isUser(), (req, res) => {

    res.render('login', { title: 'Login Page - Crypto Web' });
});
router.post('/', isUser(), async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
   
    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required!');
        }
        if (user == null) {
            throw new Error('Wrong email or password');
        };
        const hash = user.hashedPass;
        const isMatch = await bcrypt.compare(password, hash);
        if (!isMatch) {
            throw new Error('Wrong email or password');
        };
    } catch (err) {
        const errors = errorMapper(err);
        const data = {
            email: req.body.email
        };
       
        return res.render('login', { title: 'Login Page', data, errors });
    };

    const userViewModel = { _id: user._id, email: user.email };
    const token = jwt.sign(userViewModel, 'my very secure secret');
    res.cookie('SESSION_DATA', token, { httpOnly: true });
    req.user = userViewModel;
    return res.redirect('/');
});

module.exports = router;