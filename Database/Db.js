const App = require("../Root/App");

module.exports = {
  mongoConnect: async function () {
    try {
      const username = "";
      const password = "";
      const host = "127.0.0.1"; 
      const port = "27017"; 
      const databaseName = "IMSApp";
      const mongoConnetcString = `mongodb://${host}:${port}/${databaseName}`;
      await App.Mongoose.connect(mongoConnetcString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      return true;
    } catch (error) {
      console.log("Mongo DB not connected !!!");
      console.log(error);
      return false;
    }
  },
};
