const router = require("express").Router();
const Location = require('../models/location.js');

//Get all
router.get("/api/locations", async (req, res) => {
    try {
        const locations = await Location.find();
        res.send({data: locations});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

//Get by id
router.get("/api/locations/:id", getLocation, (req, res) => {
    res.send({data: res.location});
});

//Create one
router.post("/api/locations", async (req, res) => {
    const location = new Location({
        latLong: req.body.latLong,
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        description: req.body.description,
        comments: req.body.comments
    });

    try {
        const newLocation = await location.save();
        res.status(201).send({data: newLocation});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

//Update by id
router.patch("/api/locations/:id", getLocation, async (req, res) => {
    if(req.body.latLong != null) {
        res.location.latLong = req.body.latLong;
    }
    if(req.body.name != null) {
        res.location.name = req.body.name;
    }
    if(req.body.type != null) {
        res.location.type = req.body.type;
    }
    if(req.body.address != null) {
        res.location.address = req.body.address;
    }
    if(req.body.description != null) {
        res.location.description = req.body.description;
    }
    if(req.body.comments != null) {
        res.location.comments = req.body.comments;
    }
    try {
        const updatedLocation = await res.location.save();
        res.send({data: updatedLocation});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

//Delete by id
router.delete("/api/locations/:id", getLocation, async (req, res) => {
    try {
        await res.location.remove(); 
        res.send({message: "Deleted location"});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

//Middleware function
async function getLocation(req, res, next) {
    let location;
    try {
        location = await Location.findById(req.params.id);
        if(location == null) {
            return res.status(404).send({message: "Can not find location"});
        }
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }

    res.location = location;
    next();
}

module.exports = {
    router
};