const App = require("../Root/App");

module.exports = {
  load: async function () {
    try {
        
      let modelPath = App.Path.join(__dirname, "../Src/Models");
      const files = App.Fs.readdirSync(modelPath);
      files.forEach((file) => {
        const stats = App.Fs.statSync(App.Path.join(modelPath, file));
        if (stats.isFile()) {
          App.Models[App.Path.parse(file).name] = require(App.Path.join(modelPath, file));
        } else {
            // code could be continue ... / enhancing with infinite loop
        }
      });

    } catch (error) {
      console.log("Error in Load Models");
      console.log(error);
    }
  },
};
