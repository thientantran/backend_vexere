const express = require('express');
const {createTrip,getAllTrip,deleteTrip,updateTrip} = require("../controllers/trip.controllers")
const {checkExist} = require("../middlewares/validations/checkExist")
const tripRouter = express.Router();
const {Trip} = require("../models")

tripRouter.post("/create",createTrip);
tripRouter.get("/",getAllTrip);
tripRouter.delete("/delete/:id",checkExist(Trip),deleteTrip);
tripRouter.post("/update/:id",checkExist(Trip),updateTrip)
module.exports = {
    tripRouter
}