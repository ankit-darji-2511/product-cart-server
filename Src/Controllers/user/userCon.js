const App = require('../../../Root/App');

module.exports = {
    getUserList : async function (req ,res) {
        try {
            const getUser = await App.Src.Services.user.userSrv.getUserList();
            if (getUser != null) {
                let resObj = {
                    status : 200,
                    message : "User List Get Successfully",
                    result: getUser
                }
                res.send(resObj);
            }
            else{
                let resObj = {
                    status : 400,
                    message : "Error in Get User List",
                    result: null
                }
                res.send(resObj);
            }
            
        } catch (error) {
            let resObj = {
                status : 400,
                message : "Error in Get User List : Catch",
                result: null
            }
            res.send(resObj);
        }
        
        
    },

    addUser : async function (req ,res) {
        try {
            const addUser = await App.Src.Services.user.userSrv.addUser(req.body);

            if (addUser != null) {
                let resObj = {
                    status : 200,
                    message : "User Add Successfully",
                    result: addUser
                }
                res.send(resObj);
            }
            else{
                let resObj = {
                    status : 400,
                    message : "Error in Add User",
                    result: null
                }
                res.send(resObj);
            }


        } catch (error) {
            let resObj = {
                status : 400,
                message : "Error in Add User : Catch",
                result: null
            }
            res.send(resObj);;
        }
    },

    checkUser : async function (req ,res) {
        try {
            const checkUser = await App.Src.Services.user.userSrv.checkUser(req.body);
            console.log("checkUser>> ",checkUser);
            if (checkUser != null && checkUser.length != 0) {
                let resObj = {
                    status : 200,
                    message : "User Get Successfully",
                    result: checkUser
                }
                res.send(resObj);
            }
            else{
                let resObj = {
                    status : 400,
                    message : "User Not Available",
                    result: null
                }
                res.send(resObj);
            }
            
        } catch (error) {
            let resObj = {
                status : 400,
                message : "Error in Check User : Catch",
                result: null
            }
            res.send(resObj);
        }
        
        
    },

}