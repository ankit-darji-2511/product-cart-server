const App = require('../../../Root/App');

module.exports = {
    getUserList : async function () {
        try {
            const getUser = await App.Models.user.find({}).lean();
            return getUser;
        } catch (error) {
            console.log("Error in get User List : Services");
            console.log(error);
            return null
        }
    },

    addUser : async function (data) {
        try {
            const newUser = new App.Models.user(data);
            let addUser = await newUser.save(newUser);
            return addUser
        } catch (error) {
            console.log("Error in Add User : Services");
            console.log(error);
            return null
        }
    },

    checkUser : async function (data) {
        try {
            const getUser = await App.Models.user.find({user_email: data.user_email, user_password: data.user_password}).lean();
            return getUser;
        } catch (error) {
            console.log("Error in get User List : Services");
            console.log(error);
            return null
        }
    },

}