const App = require('../../../Root/App');

module.exports = {
    getItemList: async function (data) {
        try {

            let minFilter = {};
            let maxFilter = {};
            if (data.minPrice != '') {
                minFilter = { item_price: { $gte: parseInt(data.minPrice) } }
            }
            if (data.maxPrice != '') {
                maxFilter = { item_price: { $lte: parseInt(data.maxPrice) } }
            }
            const getItem = await App.Models.item.aggregate([
                {
                    $match: {
                        $and: [
                            data.category_id == '' ? {} : { category_id: new App.Mongoose.Types.ObjectId(`${data.category_id}`) },
                            minFilter,
                            maxFilter
                        ],
                    },
                },
                {
                    $lookup: {
                        from: "category",
                        localField: "category_id",
                        foreignField: "_id",
                        as: "category",
                    },
                },
                {
                    $unwind: {
                        path: "$category",
                    },
                },
                {
                    $sort: {
                        _id: -1, 
                    }
                }
            ]);

            return getItem;
        } catch (error) {
            console.log("Error in get Item List Catch : Services");
            console.log(error);
            return null;
        }
    },

    addItem: async function (data) {
        try {



            console.log("data >>> ", data);


            const newItem = new App.Models.item({
                item_code: data.itemCode,
                item_name: data.itemName,
                item_price: data.itemPrice,
                item_isActive: data.itemIsActive,
                category_id: data.categoryId
            });
            let addItem = await newItem.save(newItem);
            return addItem
        } catch (error) {
            console.log("Error in Add Item Catch : Services");
            console.log(error);
            return null
        }
    },

}