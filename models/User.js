const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: [5, 'Username must be atleast 5 characters long!'] },
    email: { type: String, required: true, minlength: [10, 'Email must be atleast 10 characters long!'] },
    hashedPass: { type: String, required: true, minlength: [4, 'Password must be atleast 4 characters long!'] }
});
userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'eng',
        strength: 2
    }
});
module.exports = model('User', userSchema);