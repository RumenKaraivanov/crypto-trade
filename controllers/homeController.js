const router = require('express').Router();
const { isGuest } = require('../middlewares/guard');

router.get('/', (req, res) => {

    res.render('home', { title: 'Home Page - Crypto Web' });
});
router.get('/logout', isGuest(), (req, res) => {
    res.clearCookie('SESSION_DATA');
    return res.redirect('/login');
});

module.exports = router;