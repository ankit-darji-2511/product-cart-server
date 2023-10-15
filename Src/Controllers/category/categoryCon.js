const App = require('../../../Root/App');

module.exports = {
    getCategoryList : async function (req ,res) {
        try {
            const getCategory = await App.Src.Services.category.categorySrv.getCategoryList();
            if (getCategory != null) {
                let resObj = {
                    status : 200,
                    message : "Category List Get Successfully",
                    result: getCategory
                }
                res.send(resObj);
            }
            else{
                let resObj = {
                    status : 400,
                    message : "Error in Get Category List",
                    result: null
                }
                res.send(resObj);
            }
            
        } catch (error) {
            let resObj = {
                status : 400,
                message : "Error in Get Category List Controller : Catch",
                result: null
            }
            res.send(resObj);
        }
        
        
    },

    addCategory : async function (req ,res) {
        try {
            const addCategory = await App.Src.Services.category.categorySrv.addCategory(req.body);

            if (addCategory != null) {
                let resObj = {
                    status : 200,
                    message : "Category Add Successfully",
                    result: addCategory
                }
                res.send(resObj);
            }
            else{
                let resObj = {
                    status : 400,
                    message : "Error in Add Category",
                    result: null
                }
                res.send(resObj);
            }


        } catch (error) {
            let resObj = {
                status : 400,
                message : "Error in Add Category Controller : Catch",
                result: null
            }
            res.send(resObj);;
        }
    },

}