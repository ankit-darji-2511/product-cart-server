const App = require("../Root/App");

module.exports = {
  load: async function () {
    try {
      App.Src.Controllers = {};
      let conPath = App.Path.join(__dirname, "../Src/Controllers");
      const files = App.Fs.readdirSync(conPath);
      files.forEach((file) => {
        const stats = App.Fs.statSync(App.Path.join(conPath, file));
        if (stats.isFile()) {
          App.Src.Controllers[App.Path.parse(file).name] = require(App.Path.join(conPath, file));
        } else {
            let innerConPath = App.Path.join(conPath, file);
            const innerFiles = App.Fs.readdirSync(innerConPath);
            innerFiles.forEach((innerFile) => {
              const stats = App.Fs.statSync(
                App.Path.join(innerConPath, innerFile)
              );
              if (stats.isFile()) {
                App.Src.Controllers[file] = {[App.Path.parse(innerFile).name] : require(App.Path.join(innerConPath, innerFile))};
              } else {
                console.log("folder :: ", file);
                // code could be continue ... / enhancing with infinite loop
              }
            });
        }
      });

    } catch (error) {
      console.log("Error in Load Controller");
      console.log(error);
    }
  },
};
