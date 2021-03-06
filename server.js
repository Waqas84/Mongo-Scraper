var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://heroku_s63td4gs:afk45p1iitavhrbrq0b7jnhbq4@ds159013.mlab.com:59013/heroku_s63td4gs");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

require("./routes/api-routes.js")(app);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
