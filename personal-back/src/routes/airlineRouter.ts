import { Router } from 'express';
const {
    postAirline
} = require("../handlers/activityAirline")

const airlineRouter = Router();

airlineRouter.post("/", postAirline);

export default airlineRouter