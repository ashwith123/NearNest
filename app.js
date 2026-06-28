const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
const listingRoutes = require("./routes/listingRoute");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));


app.use("/", authRoutes);
app.use("/listings", listingRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

mongoose.connect("mongodb://localhost:27017/nearNest")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));