const App = require("../Root/App");

module.exports = {
  load: async function () {
    try {
      App.Src.Middlewares = {};
      let midPath = App.Path.join(__dirname, "../Src/Middlewares");
      const files = App.Fs.readdirSync(midPath);
      files.forEach((file) => {
        const stats = App.Fs.statSync(App.Path.join(midPath, file));
        if (stats.isFile()) {
          App.Src.Middlewares[App.Path.parse(file).name] = require(App.Path.join(midPath, file));
        } else {
            let innerMidPath = App.Path.join(midPath, file);
            const innerFiles = App.Fs.readdirSync(innerMidPath);
            innerFiles.forEach((innerFile) => {
              const stats = App.Fs.statSync(
                App.Path.join(innerMidPath, innerFile)
              );
              if (stats.isFile()) {
                App.Src.Middlewares[file] = {[App.Path.parse(innerFile).name] : require(App.Path.join(innerMidPath, innerFile))};
              } else {
                console.log("folder :: ", file);
                // code could be continue ... / enhancing with infinite loop
              }
            });
        }
      });

    } catch (error) {
      console.log("Error in Load Middlewares");
      console.log(error);
    }
  },
};
