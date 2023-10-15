const App = require("../Root/App");

module.exports = {
  load: async function () {
    try {

      let routePath = App.Path.join(__dirname, "../Src/Routes");
      const files = App.Fs.readdirSync(routePath);
      files.forEach((file) => {
        const stats = App.Fs.statSync(App.Path.join(routePath, file));
        if (stats.isFile()) {
          const routersList = require(App.Path.join(routePath, file));
          App.ExpressServer.use("/api", routersList);
        } else {
          let innerRoutePath = App.Path.join(routePath, file);
          const innerFiles = App.Fs.readdirSync(innerRoutePath);
          innerFiles.forEach((innerFile) => {
            const stats = App.Fs.statSync(
              App.Path.join(innerRoutePath, innerFile)
            );
            if (stats.isFile()) {
              const innerRoutersList = require(App.Path.join(
                innerRoutePath,
                innerFile
              ));
              App.ExpressServer.use("/api", innerRoutersList);
            } else {
              console.log("folder :: ", file);
              // code could be continue ... / enhancing with infinite loop
            }
          });
        }
      });
    } catch (error) {
      console.log("Error in Load Router");
      console.log(error);
    }
  },
};
