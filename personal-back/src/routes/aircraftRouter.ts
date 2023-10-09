import { Router } from 'express';
const { 
    getAircraftType, 
    postAircraft, 
    postAircraftType 
} = require("../handlers/activityAircraft")

const aircraftRouter = Router();

// GET Airport Data

aircraftRouter.get("/:manufacturer/:model", getAircraftType);
aircraftRouter.post("/", postAircraft)
aircraftRouter.post("/:manufacturer/:model", postAircraftType)

export default aircraftRouter;