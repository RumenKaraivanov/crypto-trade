const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

start();

async function start() {
    const app = express();

    expressConfig(app);
    app.use(cookieParser());
    app.use(auth);
    await databaseConfig(app);
    routesConfig(app);


    app.listen(3000, () => { console.log('Server is listening on port 3000') });
};