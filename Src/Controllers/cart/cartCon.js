const App = require('../../../Root/App');

module.exports = {
    addToCart: async function (req, res) {
        try {
            const addToCart = await App.Src.Services.cart.cartSrv.addToCart(req.body);
            if (addToCart != null) {
                let resObj = {
                    status: 200,
                    message: "Item Add to Cart Successfully",
                    result: addToCart
                }
                res.send(resObj);
            }
            else {
                let resObj = {
                    status: 400,
                    message: "Error in Add Item to Cart",
                    result: null
                }
                res.send(resObj);
            }


        } catch (error) {
            let resObj = {
                status: 400,
                message: "Error in Add Item to Cart Controller : Catch",
                result: null
            }
            res.send(resObj);;
        }
    },

    getUserWiseCartItemList: async function (req, res) {
        try {
            result = {};
            const getItem = await App.Src.Services.cart.cartSrv.getUserWiseCartItemList(req.body);
            if (getItem != null) {
                result.itemData = getItem;
                const getTotalCartCount = await App.Src.Services.cart.cartSrv.getUserAddedAllCartItemCount(req.body);
                if (getTotalCartCount != null) {
                    result.itemCountData = getTotalCartCount;
                    if (result.itemData.length == 0 || result.itemCountData.length == 0) {
                        result.itemData = [];
                        result.itemCountData = [ { _id: null, total_item_qty: 0, total_item_price: 0 } ]
                    }

                    let resObj = {
                        status: 200,
                        message: "User Wise Cart List Get Successfully",
                        result: result
                    }
                    res.send(resObj);
                }
                else {
                    let resObj = {
                        status: 400,
                        message: "Error in Get User Wise Cart List",
                        result: null
                    }
                    res.send(resObj);
                }
            }
            else {
                let resObj = {
                    status: 400,
                    message: "Error in Get User Wise Cart List",
                    result: null
                }
                res.send(resObj);
            }

        } catch (error) {
            let resObj = {
                status: 400,
                message: "Error in Get User Wise Cart List Controller : Catch",
                result: null
            }
            res.send(resObj);
        }


    },

    checkUserStatus: async function (req, res) {
        try {
            const checkUserStatus = await App.Src.Services.cart.cartSrv.checkUserStatus(req.body);
            if (checkUserStatus != null) {
                let resObj = {
                    status: 200,
                    message: "User Status Get Successfully",
                    result: checkUserStatus
                }
                res.send(resObj);
            }
            else {
                let resObj = {
                    status: 400,
                    message: "Error in Get User Status",
                    result: null
                }
                res.send(resObj);
            }

        } catch (error) {
            let resObj = {
                status: 400,
                message: "Error in Get User Status Controller : Catch",
                result: null
            }
            res.send(resObj);
        }


    },

    addRemoveCartQty: async function (req, res) {
        try {
            const addRemoveQty = await App.Src.Services.cart.cartSrv.addRemoveCartQty(req.body);
            if (addRemoveQty != null) {
                let resObj = {
                    status: 200,
                    message: "Add / Remove QTY Successfully",
                    result: addRemoveQty
                }
                res.send(resObj);
            }
            else {
                let resObj = {
                    status: 400,
                    message: "Error in Add / Remove QTY Successfully",
                    result: null
                }
                res.send(resObj);
            }

        } catch (error) {
            let resObj = {
                status: 400,
                message: "Error in Add / Remove QTY Controller : Catch",
                result: null
            }
            res.send(resObj);
        }


    },

    deleteItem: async function (req, res) {
        try {
            const deleteItem = await App.Src.Services.cart.cartSrv.deleteItem(req.body);
            if (deleteItem != null) {
                let resObj = {
                    status: 200,
                    message: "Delete QTY Successfully",
                    result: deleteItem
                }
                res.send(resObj);
            }
            else {
                let resObj = {
                    status: 400,
                    message: "Error in Delete QTY Successfully",
                    result: null
                }
                res.send(resObj);
            }

        } catch (error) {
            console.log("error >>> ", error);
            let resObj = {
                status: 400,
                message: "Error in Delete QTY Controller : Catch",
                result: null
            }
            res.send(resObj);
        }


    },

    getUserAddedAllCartItemCount: async function (req, res) {
        try {
            const getTotalCartCount = await App.Src.Services.cart.cartSrv.getUserAddedAllCartItemCount(req.body);
            if (getTotalCartCount != null) {
                if (getTotalCartCount.length == 0) {
                    getTotalCartCount = { _id: null, total_item_qty: 0, total_item_price: 0 }
                }
                let resObj = {
                    status: 200,
                    message: "User Wise Total Cart Count Get Successfully",
                    result: getTotalCartCount
                }
                res.send(resObj);
            }
            else {
                let resObj = {
                    status: 400,
                    message: "Error in Get User Wise Total Cart Count",
                    result: null
                }
                res.send(resObj);
            }

        } catch (error) {
            let resObj = {
                status: 400,
                message: "Error in Get User Wise Total Cart Count Controller : Catch",
                result: null
            }
            res.send(resObj);
        }


    },

    paymentApi: async function (req, res) {
        try {
            let matchArray = [];
            req.body.cart.forEach(element => {
                matchArray.push(`${element._id}`)
            });
            const matchCondition = { $in: matchArray }
            const updateOperation = { $set: { payment_done: true } };

            const paymentApi = await App.Src.Services.cart.cartSrv.paymentApi(matchCondition, updateOperation);
            if (paymentApi != null) {
                let resObj = {
                    status: 200,
                    message: "User Payment Done",
                    result: paymentApi
                }
                res.send(resObj);
            }
            else {
                let resObj = {
                    status: 400,
                    message: "Error in User Payment",
                    result: null
                }
                res.send(resObj);
            }

        } catch (error) {
            console.log("eroorrorororo >> ", error)
            let resObj = {
                status: 400,
                message: "Error in User Payment Controller : Catch",
                result: null
            }
            res.send(resObj);
        }


    }


}