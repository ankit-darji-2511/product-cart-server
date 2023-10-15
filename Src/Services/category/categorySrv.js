const App = require('../../../Root/App');

module.exports = {
    getCategoryList : async function () {
        try {
            const getCategory = await App.Models.category.find({}).lean();
            return getCategory;
        } catch (error) {
            console.log("Error in get Category List Catch : Services");
            console.log(error);
            return null
        }
    },

    addCategory : async function (data) {
        try {
            const newCategory = new App.Models.category(data);
            let addCategory = await newCategory.save(newCategory);
            return addCategory
        } catch (error) {
            console.log("Error in Add Category Catch : Services");
            console.log(error);
            return null
        }
    },

}