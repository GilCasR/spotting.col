import { Router } from 'express';
const {
    postAirline,
    getAllAirlines
} = require("../handlers/activityAirline")

const airlineRouter = Router();

airlineRouter.post("/", postAirline);
airlineRouter.get("/", getAllAirlines)

export default airlineRouter