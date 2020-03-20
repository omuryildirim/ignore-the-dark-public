import {Request, Response} from "express";
import {Constants} from "../constants/constants";
import * as path from "path";
import * as fs from "fs";
import {Photo} from "../models/Photo";
import {PhotoData} from "../interfaces/photo.interfaces";

const ExifImage = require("exif").ExifImage;
import imageThumbnail = require("image-thumbnail");

export const thumbnail = async (fileName: string) => {
    const splitChar = fileName.includes("\\") ? "\\" : "\/";
    const pathParts = fileName.split(splitChar);
    const thumbnailDestination = fileName.replace(pathParts[pathParts.length - 1], "thumbnails/")
        + pathParts[pathParts.length - 1];

    try {
        await fs.promises.access(thumbnailDestination);
    } catch (error) {
        try {
            const options: { responseType: "base64" } = {responseType: "base64"};
            let thumbnail: string = await imageThumbnail(fileName, options);
            thumbnail = thumbnail.replace(/^data:image\/png;base64,/, "");

            fs.writeFile(thumbnailDestination, thumbnail, "base64", (err: Error) => {
                if (err) {
                    console.log(err);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
};

export const exif = async (fileName: string) => {
    try {
        const imageDestination = path.join(__dirname, Constants.PhotographyDirectory + "/" + fileName);
        await thumbnail(imageDestination);

        new ExifImage({image: imageDestination}, (error: Error, exifData: any) => {
            if (error) {
                console.log("Error: " + error.message);
            }
            else {
                 const photo: PhotoData = {
                    name: fileName,
                    date: exifData["exif"].DateTimeOriginal,
                    exposureTime: exifData["exif"].ExposureTime,
                    fNumber: exifData["exif"].FNumber,
                    ISO: exifData["exif"].ISO,
                    focalLength: exifData["exif"].FocalLength,
                    make: exifData["image"].Make,
                    model: exifData["image"].Model,
                    lens: exifData["image"].Lens
                };

                const query = {"name": fileName}, options = { upsert: true };
                Photo.findOneAndUpdate(query, photo, options).then(() => {
                }).catch((error) => {
                    console.log("Error: " + error.message);
                });
            }
        });
    } catch (error) {
        console.log("Error: " + error.message);
    }
};

/**
 * GET /api/process-photography
 * Process all photos in img directory, create thumbnails and store exif data in database..
 */
export const processPhotography = async (req: Request, res: Response) => {
    try {
        const imageDestination = path.join(__dirname, Constants.PhotographyDirectory);

        for (const file of fs.readdirSync(imageDestination)) {
            await exif(file).catch(() => {
                res.json("Error");
            });
        }

        res.json("OK");
    } catch (error) {
        console.log("Error: " + error.message);
        res.json("Error");
    }
};

/**
 * GET /api/photography
 * Serve photos.
 */
export const getPhotoData = (req: Request, res: Response) => {
    Photo.find({}).then((photoData) => {
        res.send(photoData);
    }).catch((err) => {
        res.json("There was an error on movies: " + err.message);
    });
};
