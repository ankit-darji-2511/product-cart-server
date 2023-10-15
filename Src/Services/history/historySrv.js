const App = require('../../../Root/App');

module.exports = {
    getHistoryDetails: async function (data) {
        try {
            const getHistoryData = await App.Models.cart.aggregate([
                {
                    $match: { $and: [{ user_id: new App.Mongoose.Types.ObjectId(data.loginUserId) }, { payment_done: true }] }
                },
                {
                    $lookup: {
                        from: "user",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                    },
                },
                {
                    $lookup: {
                        from: "item",
                        localField: "item_id",
                        foreignField: "_id",
                        as: "item",
                    },
                },
                {
                    $unwind: {
                        path: "$item",
                    },
                },
                {
                    $sort: {
                        _id: -1,
                    }
                },
                {
                    $project: {
                        item_qty: 1,
                        "user.user_name": 1,
                        "user._id": 1,
                        "item.item_code": 1,
                        "item.item_name": 1,
                        "item.item_price": 1,
                        total_item_qty: { $sum: "$item_qty" },
                        total_item_price: { $multiply: ["$item.item_price", "$item_qty"] },
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d", 
                                date: "$createdAt", 
                                timezone: "Asia/Kolkata" 
                            }
                        },
                        time: {
                            $dateToString: {
                                format: "%H:%M:%S", 
                                date: "$createdAt", 
                                timezone: "Asia/Kolkata"
                            }
                        },
                    },
                },
                {
                    $group: {
                        _id: "$date",
                        total_item_qty: { $sum: "$item_qty" },
                        total_item_price: { $sum: "$total_item_price" },
                        data: {

                            $push: "$$ROOT"
                        },
                    }
                }

            ]);
            
            return getHistoryData;
        } catch (error) {
            console.log("Error in Get History Details Catch : Services");
            console.log(error);
            return null;
        }
    }

}