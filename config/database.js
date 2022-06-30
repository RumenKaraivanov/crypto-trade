// TODO change database name;
const mongoose = require('mongoose');

const dbName = 'crypto';
const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database Error');
            console.error(err);
        })
    } catch (err) {
        console.error('Error connecting database');
        process.exit(1);
    };
};