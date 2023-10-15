const App = require('../../../Root/App');

module.exports = {
    getHistoryDetails : async function (req ,res) {
        try {
            const getHistoryData = await App.Src.Services.history.historySrv.getHistoryDetails(req.body);
            if (getHistoryData != null) {
                let resObj = {
                    status : 200,
                    message : "History Details Get Successfully",
                    result: getHistoryData
                }
                res.send(resObj);
            }
            else{
                let resObj = {
                    status : 400,
                    message : "Error in Get History Details",
                    result: []
                }
                res.send(resObj);
            }
            
        } catch (error) {
            let resObj = {
                status : 400,
                message : "Error in Get History Details Controller : Catch",
                result: null
            }
            res.send(resObj);
        }
        
        
    }
}