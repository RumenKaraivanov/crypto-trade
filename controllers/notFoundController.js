const router = require('express').Router();

router.get('*', (req, res) => {

    res.render('404', { title: 'Page Not Found - Crypto Web' });
})

module.exports = router;