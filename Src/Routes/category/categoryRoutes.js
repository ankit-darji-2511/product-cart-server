const App = require('../../../Root/App');

App.Router.get('/getCategoryList', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.category.categoryCon.getCategoryList);

App.Router.post('/addCategory', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.category.categoryCon.addCategory);

module.exports = App.Router;