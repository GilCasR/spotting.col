import { Router } from "express";
const {
    postPhoto,
    getAllPhotos,
    patchPhoto
} = require ("../handlers/activityPhoto")

const photoRouter = Router();

photoRouter.post("/", postPhoto);
photoRouter.get("/", getAllPhotos);
photoRouter.patch("/:id", patchPhoto)

export default photoRouter