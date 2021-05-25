require("dotenv").config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io")
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});
db.on('open', () => {
    console.log("Connected to database");
});

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

const locationsRouter = require("./routes/locations.js");
app.use(locationsRouter.router);

io.on('connection', (socket) => {
    console.log("A socket has connected");

    socket.on("submitComment", (comment, id) => {
        io.emit("displayComment", comment, id);
    })

    socket.on("disconnect", () =>{
        console.log("A socket has disconnected");
    });
});

//const fs = require('fs');
//const home = fs.readFileSync(__dirname + "/public/home/home.html", "utf-8");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home/home.html");
});

server.listen(process.env.PORT || 8080, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("The server is running on port", server.address().port);
});

