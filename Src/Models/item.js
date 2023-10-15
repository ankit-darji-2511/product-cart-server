const App = require('../../Root/App');

const ItemSchema = new App.Schema({
    item_code: {type:String, required: true, unique: true},
    item_name: {type:String, required: true},
    item_price: {type:Number, required: true},
    item_isActive: {type:Boolean},
    category_id: {type: App.Mongoose.Schema.Types.ObjectId, ref: 'category'},
    createdAt : {type:Date, default:Date.now}
}, {collection: 'item'})

module.exports = App.Mongoose.model('item', ItemSchema);

