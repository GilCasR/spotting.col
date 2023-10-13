import { Router } from 'express';
const {
    postAirline,
    getAllAirlines,
    patchAirline,
    getAirlineById
} = require("../handlers/activityAirline")

const airlineRouter = Router();

airlineRouter.post("/", postAirline);
airlineRouter.get("/", getAllAirlines);
airlineRouter.get("/:id", getAirlineById);
airlineRouter.patch("/:id", patchAirline);


export default airlineRouter