const express = require("express");
const adminRoutes = require("./adminRoutes");

const routes = express.Router();

routes.use("/admin", adminRoutes);

module.exports = routes;
