const App = require('../../../Root/App');

App.Router.post('/getUserWiseCartItemList', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.cart.cartCon.getUserWiseCartItemList);

App.Router.post('/addToCart', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.cart.cartCon.addToCart);

App.Router.post('/checkUserStatus', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.cart.cartCon.checkUserStatus);

App.Router.post('/addRemoveCartQty', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.cart.cartCon.addRemoveCartQty);

App.Router.post('/deleteItem', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.cart.cartCon.deleteItem);

App.Router.post('/getUserAddedAllCartItemCount', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.cart.cartCon.getUserAddedAllCartItemCount);

App.Router.post('/paymentApi', App.Src.Middlewares.commonMiddleware.authTokenCheck, App.Src.Controllers.cart.cartCon.paymentApi);


module.exports = App.Router;