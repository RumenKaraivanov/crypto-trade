const User = require('../models/User');
async function getUserByUsername(username) {
    const user = await User.findOne({ username: username });
    return user;
};
async function getUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
};

module.exports = {
    getUserByUsername,
    getUserByEmail
};