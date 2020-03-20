import {Request, Response} from "express";
import * as path from "path";
import {Constants} from "../constants/constants";

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, Constants.AngularDirectory, "index.html"), {startObject: {pageStatus: "default"}});
};

/**
 * GET /works
 * Home page.
 */
export const works = (req: Request, res: Response) => {
    res.render(path.join(__dirname, Constants.AngularDirectory, "index.html"), {startObject: {pageStatus: "works"}});
};

/**
 * GET /about
 * Home page.
 */
export const about = (req: Request, res: Response) => {
    res.render(path.join(__dirname, Constants.AngularDirectory, "index.html"), {startObject: {pageStatus: "about"}});
};