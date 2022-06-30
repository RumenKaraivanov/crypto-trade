const homeController = require('../controllers/homeController');
const notFountController = require('../controllers/notFoundController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerContoller');
const catalogController = require('../controllers/catalogController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const editController = require('../controllers/editController');
const searchController = require('../controllers/searchController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/login', loginController);
    app.use('/register', registerController);
    app.use('/logout', homeController);
    app.use('/catalog', catalogController);
    app.use('/create', createController);
    app.use('/details', detailsController);
    app.use('/edit', editController);
    app.use('/search', searchController);


    app.all('*', notFountController);
};