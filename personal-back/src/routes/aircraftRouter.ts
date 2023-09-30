import { Router } from 'express';
const { getAircraft } = require("../handlers/activityAircraft")

const aircraftRouter = Router();

// GET Airport Data

aircraftRouter.get("/:manufacturer/:model", getAircraft)

export default aircraftRouter;