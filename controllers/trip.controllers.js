const {Trip,station} = require("../models");
const createTrip = async(req, res) => {
    const {fromStation, toStation, startTime, price} = req.body;
    try {
        const newTrip = await Trip.create({fromStation,toStation,startTime,price});
        res.status(201).send(newTrip);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllTrip = async(req, res) => {
    try {
        const tripList = await Trip.findAll({
            include: [
                {
                    model: station,
                    as: "from"
                },
                {
                    model: station,
                    as: "to"
                }
            ]
        });
        res.status(201).send(tripList);
    } catch (error) {
        res.status(500).send(error);
    }
    
}

const deleteTrip = async (req, res) => {
    try {
        const {id} = req.params;
        await Trip.destroy({
            where: {
                id,
            }
        });
        res.status(201).send(`deleted ${id}`);
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateTrip = async (req, res) => {
    try {
        const {id} = req.params;
        const {fromStation, toStation, startTime, price} = req.body;
        await Trip.update(
            {fromStation, toStation, startTime, price},
            {
                where: {
                    id,
                },
            }
        );
        res.status(200).send(`uploaded ${id}`);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createTrip,
    getAllTrip,
    deleteTrip,
    updateTrip
}