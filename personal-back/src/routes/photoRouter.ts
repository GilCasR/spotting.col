import { Router } from "express";
const {
    postPhoto,
    getAllPhotos,
    patchPhoto,
    getPhotoById
} = require ("../handlers/activityPhoto")

const photoRouter = Router();

photoRouter.post("/", postPhoto);
photoRouter.get("/", getAllPhotos);
photoRouter.get("/:id", getPhotoById);
photoRouter.patch("/:id", patchPhoto)

export default photoRouter