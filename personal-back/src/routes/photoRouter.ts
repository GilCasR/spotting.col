import { Router } from "express";
const {
    postPhoto,
    getAllPhotos
} = require ("../handlers/activityPhoto")

const photoRouter = Router();

photoRouter.post("/", postPhoto);
photoRouter.get("/", getAllPhotos)

export default photoRouter