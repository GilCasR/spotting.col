const { Router } = require('express');
const express = require("express");
import airportRouter from "./airportRouter";
import aircraftRouter from "./aircraftRouter";
import photoRouter from "./photoRouter"

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(express.json());

router.use("/airport", airportRouter)
router.use("/aircraft", aircraftRouter)
router.use("/photo", photoRouter)

module.exports = router;

