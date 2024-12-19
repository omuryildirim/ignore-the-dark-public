import ExifReader from 'exifreader';
import imageThumbnail from 'image-thumbnail';
import * as path from "path";
import * as fs from "fs";

const folder = path.resolve(".\\photography");
const thumbnailsFolder = path.join(folder, "\\thumbnails");


const createThumbnail = async (fileName) => {
    const thumbnailFile = path.join(thumbnailsFolder, fileName);

    try {
        await fs.promises.access(thumbnailFile);
    } catch (error) {
        try {
            const options = {responseType: "base64"};
            let thumbnail = await imageThumbnail(path.join(folder, fileName), options);
            thumbnail = thumbnail.replace(/^data:image\/png;base64,/, "");

            fs.writeFileSync(thumbnailFile, thumbnail, "base64");
        } catch (err) {
            console.error("Create thumbnail: ", err);
        }
    }
};

const generateExif = async (fileName) => {
    try {
        await createThumbnail(fileName);

        const image = fs.readFileSync(path.join(folder, fileName));

        const tags = await ExifReader.load(image);
        const date = tags.DateTimeOriginal?.description;
        const exposureTime = tags.ExposureTime?.description;
        const fNumber = tags.FNumber?.description;
        const ISO = tags.ISOSpeedRatings?.value;
        const focalLength = tags.FocalLength?.description;
        const make = tags.Make?.description;
        const model = tags.Model?.description;
        const lens = tags.LensModel?.description;

        return {
            name: fileName,
            date,
            exposureTime,
            fNumber,
            ISO,
            focalLength,
            make,
            model,
            lens
        };
    } catch (error) {
        console.log("Generate exif: ", error.message);
    }
};

const processPhotography = async () => {
    try {
        const exifData = {};

        for (const file of fs.readdirSync(folder)) {
            exifData[file] = await generateExif(file);
        }

        fs.writeFileSync(path.join(folder, "exif.json"), JSON.stringify(exifData), {
            encoding: "utf8",
        });
    } catch (error) {
        console.log("Process photos: ", error.message);
    }
};

processPhotography().then();