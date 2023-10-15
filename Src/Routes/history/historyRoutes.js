const App = require('../../../Root/App');

App.Router.post('/getHistoryDetails', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.history.historyCon.getHistoryDetails);

module.exports = App.Router;