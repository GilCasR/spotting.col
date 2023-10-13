import { Request, Response } from 'express';
import { v4 as uuidv4 } from "uuid";
import { Airline, Airport } from '../db';
import {
    createAirline,
    updateAirline
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

const patchAirline = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
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
        const response = await updateAirline(
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

const getAirlineById = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const airlineById = await Airline.findByPk(id, {
            include: [
                {
                  model: Airport,
                  attributes: ['id', 'name', 'code'],
                  through: {
                    attributes: [] // This ensures that only Airport attributes are included
                  }
                }
              ]
        })
        if(airlineById){
            res.status(200).json(airlineById)
        }else{
            throw new Error(`airline with id ${id} not found`)
        }
        
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    } 
}

module.exports = {
    postAirline,
    getAllAirlines,
    patchAirline,
    getAirlineById
}