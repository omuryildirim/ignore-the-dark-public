import {Request, Response} from "express";
import * as path from "path";
import {Constants} from "../constants/constants";


/**
 * GET /mind
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    res.render(path.join(__dirname, Constants.AngularDirectory, "index.html"), {startObject: {pageStatus: "mind"}});
};

/**
 * GET /music
 * Home page.
 */
export const music = (req: Request, res: Response) => {
    res.render(path.join(__dirname, Constants.AngularDirectory, "index.html"), {startObject: {pageStatus: "music"}});
};

/**
 * GET /photography
 * Home page.
 */
export const photography = (req: Request, res: Response) => {
    res.render(path.join(__dirname, Constants.AngularDirectory, "index.html"), {startObject: {pageStatus: "photography"}});
};

/**
 * GET /movie
 * Home page.
 */
export const movie = (req: Request, res: Response) => {
    res.render(path.join(__dirname, Constants.AngularDirectory, "index.html"), {startObject: {pageStatus: "movielist"}});
};

/**
 * GET /editmovie
 * Home page.
 */
export const editmovie = (req: Request, res: Response) => {
    res.render(path.join(__dirname, Constants.AngularDirectory, "index.html"), {startObject: {pageStatus: "editmovie"}});
};