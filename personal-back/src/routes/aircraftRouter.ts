import { Router } from 'express';
const { 
    getAircraftType, 
    postAircraft, 
    postAircraftType,
    getAllAircraftTypes,
    getAllAircrafts,
    getAircraftById
} = require("../handlers/activityAircraft")

const { jwtAdminMiddleware } = require ("../handlers/activityJwt")

const aircraftRouter = Router();


// Aircraft Data

aircraftRouter.post("/", jwtAdminMiddleware, postAircraft);
aircraftRouter.get("/byId/:id", getAircraftById);
aircraftRouter.get("/all", getAllAircrafts);

// Aircraft Type Data

aircraftRouter.post("/:manufacturer/:model", jwtAdminMiddleware, postAircraftType);
aircraftRouter.get("/:manufacturer/:model", getAircraftType);
aircraftRouter.get("/allTypes", getAllAircraftTypes);

export default aircraftRouter;