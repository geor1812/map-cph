const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mapapp", {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});
db.on('open', () => {
    console.log("Connected to database");
});

app.use(express.json());
app.use(express.static(__dirname + "/public"));

const locationsRouter = require("./routes/locations.js");
app.use(locationsRouter.router);

//const fs = require('fs');
//const home = fs.readFileSync(__dirname + "/public/home/home.html", "utf-8");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home/home.html");
});

const server = app.listen(process.env.PORT || 8080, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("The server is running on port", server.address().port);
});