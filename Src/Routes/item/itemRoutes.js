const App = require('../../../Root/App');

App.Router.post('/getItemList', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.item.itemCon.getItemList);

App.Router.post('/addItem', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.item.itemCon.addItem);

module.exports = App.Router;