const express = require("express");
const { checkExist } = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const { station } = require("../models");

const {
  createStation,
  getAllStation,
  getDetailStation,
  updateStation,
  deleteStation,
} = require("../controllers/station.controllers");
const stationRouter = express.Router();

stationRouter.post("/", authenticate, authorize(["ADMIN"]), createStation);
stationRouter.get("/", authenticate, getAllStation);
stationRouter.get("/:id", getDetailStation);
stationRouter.put("/:id", checkExist(station), updateStation);
stationRouter.delete("/:id", authenticate, checkExist(station), deleteStation);
module.exports = {
  stationRouter,
};
