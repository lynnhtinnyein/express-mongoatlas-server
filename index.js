require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routes/users');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', userRouter);

// Connect to MongoDB
const cluster = process.env.MONGO_ATLAS_CLUSTER_NAME;
const dbName = process.env.MONGO_ATLAS_DB_NAME;
const username = process.env.MONGO_ATLAS_USERNAME;
const password = process.env.MONGO_ATLAS_PASSWORD;
const dbURI = `mongodb+srv://${username}:${password}@${cluster}.np1mnd3.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

const port = process.env.PORT || 1000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

console.log("Connecting to Mongo Atlas. Please Wait...");

