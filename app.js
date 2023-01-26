const express = require("express");
const ExpressError = require("./expressError");
const app = express();
const itemRoutes = require("./routes");

app.use(express.json());
app.use("/items", itemRoutes);







// app.listen(3000, function () {
//   console.log("Server starting on port 3000")
// })

module.exports = app;
