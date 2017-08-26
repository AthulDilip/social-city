var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')


var user = require('./Routes/User')
var task = require('./Routes/Task')

mongoose.connect("mongodb://localhost:27017/socialdb"); //local

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected!')
})

var app = express()
app.use(express.static('src'))

app.get("/loaderio-679668c5470e08fc608f34051d56cd16", (req, res) => {
    res.sendFile(__dirname + "/src/loader");
})
app.get("/loaderio-679668c5470e08fc608f34051d56cd16.html", (req, res) => {
    res.sendFile(__dirname + "/src/loader");
})
app.get("/loaderio-679668c5470e08fc608f34051d56cd16.txt", (req, res) => {
    res.sendFile(__dirname + "/src/loader");
})


function defaultContentTypeMiddleware (req, res, next) {
  req.headers['content-type'] = 'application/json';
  next();
}

app.use('/', defaultContentTypeMiddleware)

app.use(bodyParser.json())

app.use('/v1/user', user)
app.use('/v1/task', task)

app.listen(3001, () => {
    console.log("Connected to PORT : 3001")
})