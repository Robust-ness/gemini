let express = require("express");
const { env } = require("process");
let app = express();
let http = require('http').Server(app);
let port = process.env.port || 8888;
let path = require("path")
let bodyParser = require("body-parser")
let cookieParser = require("cookie-parser");
const { Aggregate } = require("mongoose");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

let server = http.listen(port, () => {
    console.log("Listening on port " + port);
})

let accounts = {
    "AndiKaylaAdam": 5000,
    "Gamers": 5000,
    "Mor Gamers": 5000,
    "Rich": 5000,
    "Bill Gates And Me": 5000,
    "Morbius": 5000,
    "More-Bius": 5000,
    "Even More-Bius": 5000
}

//fwbibuwerwqfguibrybqwyuebrgvyrwyufvoyqurvywebyufgayweefibyquwgfruhvyuwgeycburifhyebjfhbfgebwhjfbngjhlrbyufvvubnrewuyfbgyhbrquiwfhdyuebdfhvfyuebwfjhbeyufbeufbyequwvfpuwbvyourwqbuednbuiehfuejnfjebfyuewnfjnbqyurbfubewuyofhbuieybguwbqruifnruqfhewuiqfbybfu

app.get("/", (req, res) => {
    if (req.cookies["logged-in"]) {
        res.redirect("/homepage")
    }
    else {
        res.sendFile(path.join(__dirname, "index.html"));
    }
})

app.get("/viewAccounts", (req, res) => {
    if (req.cookies["logged-in"]) {
        res.sendFile(path.join(__dirname, "ViewAccounts.html"));
    }
    else {
        res.send("no")
    }
})


app.get("/createAccount", (req, res) => {
    res.sendFile(path.join(__dirname, "accountCreation.html"));
})
app.get("/addPayment", (req, res) => {
    res.sendFile(path.join(__dirname, "payment.html"));
})
app.get("/join", (req, res) => {
    res.sendFile(path.join(__dirname, "join.html"));
})
app.get("/create", (req, res) => {
    res.sendFile(path.join(__dirname, "create.html"));
})
app.get("/homePage", (req, res) => {
    if (req.cookies["logged-in"]) {
        res.sendFile(path.join(__dirname, "home.html"));
    }
    else {
        res.sendFile(path.join(__dirname, "index.html"));
    }
})

app.get("/logout", (req, res) => {
    res.clearCookie("logged-in")
    res.redirect("/")
})

app.get("*", async (req, res) => {
    res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
})

app.post("/login", (req, res) => {
    if (req.body.username == "AdamAndiKayla" & req.body.password == "password") {
        res.cookie("logged-in", "yes")
    }
    res.redirect("/homepage")
})