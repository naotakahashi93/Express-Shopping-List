const express = require("express");
const ExpressError = require("./expressError");
const items = require("./fakeDb"); // an empty array of items

const router = new express.Router()

//GET /items this should render a list of shopping items.
//Here is what a response looks like:
//[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
router.get("/", function(req,res, next){
   res.json({items}) // "items" is the array of objects we are pushing the new items to in the post request
})

//POST /items - this route should accept JSON data and add it to the shopping list.
//Here is what a sample request/response looks like:
//{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}
router.post("/", function(req,res, next){
    try{
        if (!req.body.name) throw new ExpressError("Name is required", 400);
        const newItem = {name: req.body.name, price: req.body.price} // set the name to the name that we put in the body and price to the price we set on the body (right not we are doing it in insomnia)
        items.push(newItem)
        return res.status(201).json({items: newItem}) //set status code to 201 AKA created
    } catch(e){
        return next(e)
    }
})

//GET /items/:name - this route should display a single item’s name and price.
//Here is what a sample response looks like:
//{“name”: “popsicle”, “price”: 1.45}
router.get("/:name", function(req,res){
    const foundItem = items.find(found => found.name === req.params.name) // looking for the item in the item array where the name matches that of he request param 
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
      }
    res.json({ item: foundItem }) // if found return the json with that item obj
})


//PATCH /items/:name, this route should modify a single item’s name and/or price.
//Here is what a sample request/response looks like:
//{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}
router.patch("/:name", function(req,res){
    const foundItem = items.find(found => found.name === req.params.name) // looking for the item in the item array where the name matches that of he request param 
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
      }
    foundItem.name = req.body.name;
    foundItem.price = req.body.price
})

// /DELETE /items/:name - this route should allow you to delete a specific item from the array.
//Here is what a sample response looks like:
//{message: “Deleted”}
router.delete("/:name", function(req,res){
    const foundItem = items.findIndex(found => found.name === req.params.name) // looking for the item index in the item array where the name matches that of he request param 
    if (foundItem === -1) { // if there is not index to be found its not a match 
        throw new ExpressError("Item not found", 404)
      }
    items.splice(foundItem,1) // splice it by removing the index of that found item index
    res.json({ message: "Deleted" })
})

module.exports = router;