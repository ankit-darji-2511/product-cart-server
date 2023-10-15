const App = require('../../../Root/App');

module.exports = {
    getItemList : async function (req ,res) {
        try {
            const getItem = await App.Src.Services.item.itemSrv.getItemList(req.body);
            if (getItem != null) {
                let resObj = {
                    status : 200,
                    message : "Item List Get Successfully",
                    result: getItem
                }
                res.send(resObj);
            }
            else{
                let resObj = {
                    status : 400,
                    message : "Error in Get Item List",
                    result: null
                }
                res.send(resObj);
            }
            
        } catch (error) {
            let resObj = {
                status : 400,
                message : "Error in Get Item List Controller : Catch",
                result: null
            }
            res.send(resObj);
        }
        
        
    },

    addItem : async function (req ,res) {
        try {
            const addItem = await App.Src.Services.item.itemSrv.addItem(req.body);

            if (addItem != null) {
                let resObj = {
                    status : 200,
                    message : "Item Add Successfully",
                    result: addItem
                }
                res.send(resObj);
            }
            else{
                let resObj = {
                    status : 400,
                    message : "Error in Add Item",
                    result: null
                }
                res.send(resObj);
            }


        } catch (error) {
            let resObj = {
                status : 400,
                message : "Error in Add Item Controller : Catch",
                result: null
            }
            res.send(resObj);;
        }
    },

}