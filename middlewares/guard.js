function isGuest() {
    return (req, res, next) => {
        const user = req.cookies['SESSION_DATA'];
        if (user) {
            next();
        } else {
            res.redirect('/login');
        };
    };
};
function isUser() {
    return (req, res, next) => {
        const user = req.cookies['SESSION_DATA'];
        if (user) {
            res.redirect('/');
        } else {
            next()
        };
    };
};
module.exports = {
    isUser,
    isGuest
};