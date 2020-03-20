import mongoose from "mongoose";
import {PhotoData} from "../interfaces/photo.interfaces";

export type PhotoDocument = mongoose.Document & PhotoData;

const photoSchema = new mongoose.Schema({
    name: String,
    date: String,
    exposureTime: String,
    fNumber: String,
    ISO: String,
    focalLength: String,
    make: String,
    model: String,
    lens: String
});

export const Photo = mongoose.model<PhotoDocument>("Photo", photoSchema, "photos");