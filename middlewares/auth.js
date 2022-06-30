const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies['SESSION_DATA'];

    if (token) {
        try {
            const userData = jwt.verify(token, 'my very secure secret');
            req.user = userData;
            res.locals.user = userData;

        } catch (err) {
            res.clearCookie('SESSION_DATA');
            return res.redirect('/login');
        };
    };
    next();
};