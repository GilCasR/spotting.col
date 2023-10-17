import { Router } from 'express';
const {
    postAirline,
    getAllAirlines,
    patchAirline,
    getAirlineById
} = require("../handlers/activityAirline")

const { jwtAdminMiddleware } = require ("../handlers/activityJwt")

const airlineRouter = Router();

airlineRouter.post("/", jwtAdminMiddleware, postAirline);
airlineRouter.get("/", getAllAirlines);
airlineRouter.get("/:id", getAirlineById);
airlineRouter.patch("/:id", jwtAdminMiddleware, patchAirline);


export default airlineRouter