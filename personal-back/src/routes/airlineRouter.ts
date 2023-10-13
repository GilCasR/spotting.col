import { Router } from 'express';
const {
    postAirline,
    getAllAirlines,
    patchAirline
} = require("../handlers/activityAirline")

const airlineRouter = Router();

airlineRouter.post("/", postAirline);
airlineRouter.get("/", getAllAirlines);
airlineRouter.patch("/:id", patchAirline);

export default airlineRouter