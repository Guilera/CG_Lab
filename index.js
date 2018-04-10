var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
	res.render("lab1");
});

app.listen(8080);

