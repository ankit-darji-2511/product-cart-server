// All NPM required code
const App = {};
const express = require("express");
require('dotenv').config();
const ExpressServer = express();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const router = express.Router();
const Port = process.env.SERVER_PORT || 5143;
// Middleware for parsing JSON data in the request body
ExpressServer.use(express.json());
ExpressServer.use(cors());

// Middleware for parsing URL-encoded data in the request body
ExpressServer.use(express.urlencoded({ extended: true }));

// Add modules in to App Obj
App.Src = {};
App.Models = {};
App.ExpressServer = ExpressServer;
App.Port = Port;
App.Mongoose = mongoose;
App.Schema = mongoose.Schema;
App.Fs = fs;
App.Path = path;
App.Router = router;


module.exports = App;
