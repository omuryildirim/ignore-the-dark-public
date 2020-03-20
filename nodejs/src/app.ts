import express from "express";
import path from "path";
// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as mindController from "./controllers/mind";
import * as exifController from "./controllers/exif";
import mongoose from "mongoose";
import bluebird from "bluebird";
import {MONGODB_URI} from "./util/secrets";
import bodyParser from "body-parser";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => {},
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.use(
    "/", express.static(path.join(__dirname, "../../angular/dist"), { maxAge: 31557600000 })
);

app.use(
    "/photography", express.static(path.join(__dirname, "../../photography"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.get("/works", homeController.works);
app.get("/about", homeController.about);
app.get("/mind", mindController.index);
app.get("/music", mindController.music);
app.get("/photography", mindController.photography);

/**
 * API examples routes.
 */
app.get("/api/photography", exifController.getPhotoData);
app.get("/api/process-photography", exifController.processPhotography);

app.get("*", homeController.index);

export default app;
