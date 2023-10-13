import { Router } from 'express';
import airlineRouter from './airlineRouter';
const { 
    getAircraftType, 
    postAircraft, 
    postAircraftType,
    getAllAircraftTypes,
    getAllAircrafts,
    getAircraftById
} = require("../handlers/activityAircraft")

const aircraftRouter = Router();

// Aircraft Data

aircraftRouter.post("/", postAircraft);
aircraftRouter.get("/byId/:id", getAircraftById)
aircraftRouter.get("/all", getAllAircrafts);

// Aircraft Type Data

aircraftRouter.post("/:manufacturer/:model", postAircraftType);
aircraftRouter.get("/:manufacturer/:model", getAircraftType);
aircraftRouter.get("/allTypes", getAllAircraftTypes);

export default aircraftRouter;