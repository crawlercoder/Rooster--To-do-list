const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = ["Hello there! enter your task"];
const workItems = ["Work Item"];
const finishedItems = ["Finished Items"];
const workFinished = ["Finished work"];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

//Get Request

app.get("/", function (req, res) {

    let day = date.getDate();
    res.render("list", { Time:day, listTitle: "Home List", newListItems: items, finishedItems: finishedItems })

});


app.get("/work", (req, res) => {

    let day = date.getDate();
    res.render("list", { Time:day, listTitle: "Work List", newListItems: workItems,finishedItems: workFinished })

})

app.get("/about", (req, res) => {

    res.render("about")

})
 
//Post

app.post("/", function (req, res) {
    console.log("hello");
    let item = req.body.newItem;
    if (req.body.List === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else  {
        items.push(item);
        res.redirect("/");
    }
});

app.post("/work", function (req, res) {

    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.post("/delete", function (req, res) {

    console.log(req.body.cross);
    // console.log(req.body.cross[4]);

    if(req.body.cross[2]=="H"){

    var idx = req.body.cross[0];
    let elem = items[idx];
    items.splice(idx, 1);
    finishedItems.push(elem);
    res.redirect("/");

    } else{

    var idx = req.body.cross[0];
    let elem = workItems[idx];
    workItems.splice(idx, 1);
    workFinished.push(elem);
    res.redirect("/work");
    } 
    
})

app.post("/readd", function(req,res){
    if(req.body.cross[2]=="H"){

        var idx = req.body.cross[0];
        let elem = finishedItems[idx];
        finishedItems.splice(idx, 1);
        items.push(elem);
        res.redirect("/");
    
        } else{
    
        var idx = req.body.cross[0];
        let elem = workFinished[idx];
        workFinished.splice(idx, 1);
        workItems.push(elem);
        res.redirect("/work");
        } 
})
app.post("/pdel", function(req,res){
    
    if(req.body.dash[2]=="H"){

        var idx = req.body.dash[0];
        finishedItems.splice(idx, 1);
        res.redirect("/");
    
        } else{
    
        var idx = req.body.dash[0];
        workFinished.splice(idx, 1);
        res.redirect("/work");
        } 
})

app.listen(3000, function () {
    console.log("Server is listening on port 300");
})