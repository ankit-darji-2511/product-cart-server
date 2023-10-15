const App = require('../../Root/App');

const UserSchema = new App.Schema({
    user_name: {type:String, required: true,},
    user_email: {type:String, required: true, unique: true},
    user_password: {type:String, required: true},
    user_isActive: {type:Boolean},
    createdAt : {type:Date, default:Date.now}
}, {collection: 'user'})

module.exports = App.Mongoose.model('user', UserSchema);

