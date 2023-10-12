import { Router } from 'express';
const { 
    getAircraftType, 
    postAircraft, 
    postAircraftType,
    getAllAircraftTypes,
    getAllAircrafts
} = require("../handlers/activityAircraft")

const aircraftRouter = Router();

// Aircraft Data

aircraftRouter.post("/", postAircraft);
aircraftRouter.get("/all", getAllAircrafts);

// Aircraft Type Data

aircraftRouter.post("/:manufacturer/:model", postAircraftType);
aircraftRouter.get("/:manufacturer/:model", getAircraftType);
aircraftRouter.get("/allTypes", getAllAircraftTypes);

export default aircraftRouter;