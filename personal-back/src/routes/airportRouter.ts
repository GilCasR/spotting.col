import { Router } from 'express';
const { 
    getAirport,
    getAllAirports
 } = require("../handlers/activityAirport")

const airportRouter = Router();

// GET Airport Data

airportRouter.get("/:code", getAirport)
airportRouter.get("/", getAllAirports)

export default airportRouter;
