import { Request, Response } from 'express';
import { v4 as uuidv4 } from "uuid";
import { Airline } from '../db';
import {
    createAirline
} from "../controller/airlineController"

const postAirline = async (req: Request, res: Response) => {
    try {
        const {
            name,
            foundation,
            skyTrax_rating,
            iata_code,
            main_office,
            country,
            country_code,
            logo,
            airports
        } = req.body
        const id = uuidv4()
        const response = await createAirline(
            id,
            name,
            foundation,
            skyTrax_rating,
            iata_code,
            main_office,
            country,
            country_code,
            logo,
            airports
        )
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

const getAllAirlines = async (req: Request, res: Response) => {
    try {
        const response = await Airline.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

module.exports = {
    postAirline,
    getAllAirlines
}