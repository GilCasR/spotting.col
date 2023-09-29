import { Router, Request, Response } from 'express';
const { getAirportData } = require("../handlers/activityAirport")

const airportRouter = Router();

// GET Airport Data

airportRouter.get("/:code", getAirportData)

export default airportRouter;
