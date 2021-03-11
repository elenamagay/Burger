const express = require("express");
const hbs = require ("express-handlebars");
const burger_controller = require("./controllers/burgers_controller");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(burger_controller);

app.listen(PORT, function(){
    console.log("Server listening on: localhost: " + PORT);
});