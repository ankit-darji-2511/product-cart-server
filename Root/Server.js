"use strict";

const App = require("./App");

(async function () {
  try {
    // database connect code
    let dbConect = await require("../Database/Db").mongoConnect();

    if (dbConect) {
      
      console.log("Controller Loading ...");
      await require('../Library/controller').load(); // load controllers
      console.log("Service Loading ...");
      await require('../Library/service').load(); // load services
      console.log("Models Loading ...");
      await require('../Library/models').load(); // load models
      console.log("Middleware Loading ...");
      await require('../Library/middleware').load(); // load middleware
      console.log("Router Loading ...");
      await require('../Library/route').load(); // load routers
      
      // server connected
      App.ExpressServer.listen(App.Port, () => {
        console.log("Server started on Port : " + App.Port);
      });
    } else {
      console.log("Serevr not Started : Database Connection Issue !!!");
    }
  } catch (error) {
    console.log("Serevr not Started : App Creshed !!!");
    console.log(error);
  }
})();
