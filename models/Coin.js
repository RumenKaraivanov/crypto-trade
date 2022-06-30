const { Schema, model } = require('mongoose');
const URL_PATTERN = /^https?:/;

const userSchema = new Schema({
    name: { type: String, required: true, minlength: [2, 'Name must be atleast 2 characters long!'] },
    imageUrl: {
        type: String, required: true, validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'The image must be valid URL!'
        }
    },
    price: { type: Number, required: true, min: [1, 'Price must be positive number.'] },
    description: { type: String, required: true, minlength: [10, 'Description must be atleast 10 characters long!'] },
    payment: {
        type: String, required: true, enum: {
            values: ['crypto-wallet', 'paypal', 'credit-card', 'debit-card'],
            message: '{VALUE} is not supported!'
        }
    },
    buyCrypto: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Coin', userSchema);