const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = ["Hello there! enter your task"];
const workItems = [];
const finishedItems = ["Finished Items"];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", function (req, res) {

    let day = date.getDate();
    res.render("list", { listTitle: day, newListItems: items, finishedItems: finishedItems })

});

app.post("/", function (req, res) {
    console.log("hello");
    let item = req.body.newItem;
    if (req.body.List === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});



app.get("/work", (req, res) => {

    res.render("list", { listTitle: "Work List", newListItems: workItems })

})

app.get("/about", (req, res) => {

    res.render("about")

})

app.post("/work", function (req, res) {

    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.post("/delete", function (req, res) {
    console.log(req.body.cross);
    var idx = req.body.cross;
    let elem = items[idx];
    items.splice(idx, 1);
    finishedItems.push(elem);
    res.redirect("/");
})



app.listen(3000, function () {
    console.log("Server is listening on port 300");
})