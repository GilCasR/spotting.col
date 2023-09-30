import { Router } from 'express';
const { getAircraft, postAircraft } = require("../handlers/activityAircraft")

const aircraftRouter = Router();

// GET Airport Data

aircraftRouter.get("/:manufacturer/:model", getAircraft);
aircraftRouter.post("/", postAircraft)

export default aircraftRouter;