require("dotenv").config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io")
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const { v4: uuidv4 } = require('uuid');

mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});
db.on('open', () => {
    console.log("Connected to database");
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.set('trust proxy', 1);

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use("/api/", apiLimiter);

app.use(session({
    genid: (req) => {
        return uuidv4();
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

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

app.get("/", (req, res) => {
    console.log(req.sessionID);
    res.sendFile(__dirname + "/public/home/home.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login/login.html");
});

app.get("/authorize", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/dashboard")
    } else {
        res.redirect("/login");
    }
});

app.post("/login", 
    (req, res, next) => {
        if(req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD) {
            next();
        } else {
            res.sendStatus(401);
        }
    },
    (req, res) => {
        req.session.loggedIn = true;
        res.redirect("/dashboard")
    }
);

app.get("/dashboard", (req, res) => {
    /* Commenting this for now because it's annoying to log in everytime there's a change
    if(req.session.loggedIn) {
        res.sendFile(__dirname + "/public/dashboard/dashboard.html");
    } else {
        res.redirect("/login");
    }
    */

    res.sendFile(__dirname + "/public/dashboard/dashboard.html");
});

app.get("/dashboard/add", (req, res) => {
    res.sendFile(__dirname + "/public/add/add.html");
});

app.get("/dashboard/edit/:id", (req, res) => {
    res.sendFile(__dirname + "/public/edit/edit.html");
});

server.listen(process.env.PORT || 8080, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("The server is running on port", server.address().port);
});

