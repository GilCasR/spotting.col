const { Router } = require('express');
const express = require("express");
import airportRouter from "./airportRouter";
import aircraftRouter from "./aircraftRouter";
import photoRouter from "./photoRouter";
import airlineRouter from "./airlineRouter";
import userRouter from "./userRouter";
const router = Router();

router.use(express.json());

router.use("/airport", airportRouter);
router.use("/aircraft", aircraftRouter);
router.use("/photo", photoRouter);
router.use("/airline", airlineRouter);
router.use("/user", userRouter);

module.exports = router;

