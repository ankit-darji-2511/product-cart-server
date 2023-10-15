const App = require('../../Root/App');

const CategoryChema = new App.Schema({
    category_code: {type:String, required: true},
    category_name: {type:String, required: true}
}, {collection: 'category'})

module.exports = App.Mongoose.model('category', CategoryChema);

