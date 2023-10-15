const App = require("../Root/App");

module.exports = {
  load: async function () {
    try {
        App.Src.Services = {};
      let srvPath = App.Path.join(__dirname, "../Src/Services");
      const files = App.Fs.readdirSync(srvPath);
      files.forEach((file) => {
        const stats = App.Fs.statSync(App.Path.join(srvPath, file));
        if (stats.isFile()) {
          App.Src.Services[
            App.Path.parse(file).name
          ] = require(App.Path.join(srvPath, file));
        } else {
          let innerSrvPath = App.Path.join(srvPath, file);
          const innerFiles = App.Fs.readdirSync(innerSrvPath);
          innerFiles.forEach((innerFile) => {
            const stats = App.Fs.statSync(
              App.Path.join(innerSrvPath, innerFile)
            );
            if (stats.isFile()) {
              App.Src.Services[file] = {
                [App.Path.parse(innerFile).name]: require(App.Path.join(
                  innerSrvPath,
                  innerFile
                )),
              };
            } else {
              console.log("folder :: ", file);
              // code could be continue ... / enhancing with infinite loop
            }
          });
        }
      });

      //   console.log("App.Src.Services>>> ", App.Src.Services);
    } catch (error) {
      console.log("Error in Load Controller");
      console.log(error);
    }
  },
};
