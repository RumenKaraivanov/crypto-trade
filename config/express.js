const express = require('express');
const { engine } = require('express-handlebars');

module.exports = (app) => {

    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './views');
    app.use(express.urlencoded({ extended: false }));
    app.use('/static', express.static('static'));
};