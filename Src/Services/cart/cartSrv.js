const App = require("../../../Root/App");

module.exports = {
  addToCart: async function (data) {
    try {
      let findItemInCart = await App.Models.cart
        .find({
          $and: [
            { user_id: data.loginUserId },
            { item_id: data.item_id },
            { payment_done : false }
          ],
        })
        .lean();
      if (findItemInCart.length == 0) {
        const newAddData = {
          user_id: data.loginUserId,
          item_id: data.item_id,
          item_qty: 1,
        };
        const newAddToCart = new App.Models.cart(newAddData);
        let addToCart = await newAddToCart.save(newAddToCart);
        return addToCart;
      } else {
        const addToCart = App.Models.cart.findOneAndUpdate(
          { _id: findItemInCart[0]._id },
          { $inc: { item_qty: +1 } },
          { new: true }
        );
        return addToCart;
      }


    } catch (error) {
      console.log("Error in Add Item to Cart Catch : Services");
      console.log(error);
      return null;
    }
  },

  getUserWiseCartItemList: async function (data) {
    try {
      const getItem = await App.Models.cart.aggregate([
        {
          $match: { $and: [{user_id: new App.Mongoose.Types.ObjectId(data.user_id)}, {payment_done: false}] }
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
          $project: {
            item_qty: 1,
            "user.user_name": 1,
            "user._id": 1,
            "item.item_code": 1,
            "item.item_name": 1,
            "item.item_price": 1
          },
        }
      ]);
      return getItem;
    } catch (error) {
      console.log("Error in get User Wise Cart List Catch : Services");
      console.log(error);
      return null;
    }
  },

  checkUserStatus: async function (data) {
    try {
      const checkUserStatus = App.Models.user
        .find({ _id: data.user_id })
        .lean();
      return checkUserStatus;
    } catch (error) {
      console.log("Error in Get Check Use Status : Services");
      console.log(error);
      return null;
    }
  },

  addRemoveCartQty: async function (data) {
    try {
      if (data.action == 'add') {
        data.action = +1
      }
      else if (data.action == 'remove') {
        data.action = -1
      }
      else {
        data.action = 0
      }
      const addRemoveQty = App.Models.cart.updateOne({ _id: data.data._id }, { $inc: { item_qty: data.action } });
      return addRemoveQty;
    } catch (error) {
      console.log("Error in Get Check Use Status : Services");
      console.log(error);
      return null;
    }
  },

  deleteItem: async function (data) {
    try {
      console.log('data >>>> ', data.data._id);
      const addRemoveQty = App.Models.cart.deleteOne({ _id: data.data._id });
      return addRemoveQty;
    } catch (error) {
      console.log("Error in Get Check Use Status : Services");
      console.log(error);
      return null;
    }
  },

  getUserAddedAllCartItemCount: async function (data) {
    try {
      const getTotalCount = await App.Models.cart.aggregate([
        {
          $match: { $and: [{user_id: new App.Mongoose.Types.ObjectId(data.user_id)}, {payment_done: false}] },
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
          $project: {
            item_qty: 1,
            "user.user_name": 1,
            "user._id": 1,
            "item.item_code": 1,
            "item.item_name": 1,
            "item.item_price": 1,
            "total_price": { $multiply: ["$item.item_price", "$item_qty"] }
          },
        },
        {
          $group: { _id: null, total_item_qty: { $sum: "$item_qty" }, total_item_price: { $sum: "$total_price" } }
        }
      ]);

      return getTotalCount;
    } catch (error) {
      console.log("Error in get User Wise Cart List Catch : Services");
      console.log(error);
      return null;
    }
  },

  paymentApi: async function (matchCondition, updateOperation) {
    try {

    const paymentStatus = App.Models.cart.updateMany(
      {_id: matchCondition},
      { '$set': { payment_done: true } }
    )
    return paymentStatus;
    } catch (error) {
      console.log("Error in Get Check Use Status : Services");
      console.log(error);
      return null;
    }
  },
};
