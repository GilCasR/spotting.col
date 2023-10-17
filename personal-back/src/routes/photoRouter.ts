import { Router } from "express";
const {
    postPhoto,
    getAllPhotos,
    patchPhoto,
    getPhotoById
} = require ("../handlers/activityPhoto")

const { jwtAdminMiddleware } = require ("../handlers/activityJwt")

const photoRouter = Router();

photoRouter.post("/", jwtAdminMiddleware, postPhoto);
photoRouter.get("/", getAllPhotos);
photoRouter.get("/:id", getPhotoById);
photoRouter.patch("/:id", jwtAdminMiddleware, patchPhoto);

export default photoRouter