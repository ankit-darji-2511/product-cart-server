const App = require('../../Root/App');

const CartSchema = new App.Schema({
    user_id: {type: App.Mongoose.Schema.Types.ObjectId, ref: 'user'},
    item_id: {type: App.Mongoose.Schema.Types.ObjectId, ref: 'item'},
    item_qty : {type:Number},
    payment_done: {type:Boolean, default:false},
    createdAt : {type:Date, default:Date.now}
}, {collection: 'cart'})

module.exports = App.Mongoose.model('cart', CartSchema);

