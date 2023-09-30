import { Router, Request, Response } from 'express';
const { getAirport } = require("../handlers/activityAirport")

const airportRouter = Router();

// GET Airport Data

airportRouter.get("/:code", getAirport)

export default airportRouter;
