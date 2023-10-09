import { Router } from "express";
const {
    postPhoto
} = require ("../handlers/activityPhoto")

const photoRouter = Router();

photoRouter.post("/", postPhoto)

export default photoRouter