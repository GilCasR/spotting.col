const { Router } = require('express');
const express = require("express");
import airportRouter from "./airportRouter";
import aircraftRouter from "./aircraftRouter";

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(express.json());

router.use("/airports", airportRouter)
router.use("/aircraft", aircraftRouter)

module.exports = router;

