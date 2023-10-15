const App = require('../../../Root/App');

App.Router.get('/getUserList', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.user.userCon.getUserList);

App.Router.post('/addUser', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.user.userCon.addUser);

App.Router.post('/checkUser', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.user.userCon.checkUser);

module.exports = App.Router;