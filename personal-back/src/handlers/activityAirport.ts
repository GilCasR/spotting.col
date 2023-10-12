import { Request, Response } from 'express';
import { Airport } from '../db';
import { getAirportData } from "../controller/airportControllers";

interface Runways {
    length_ft: number;
    length_m: number;
    nameA: string;
    nameB: string;    
}

interface AirportAttributes {
    id: string;
    name: string;
    code: string;
    elevation: number;
    latitud: number;
    longitude: number;
    country: string;
    countryCode: string;
    runways: Runways[];
    region: string;
    city: string;
}

const getAirport = async (req: Request, res: Response) => {
    const queryCode: string = req.params.code
    console.log(queryCode);
    
    try {
        const airportDb = await Airport.findOne({ 
            where: { code: queryCode.toUpperCase() } 
        });        
        if(airportDb){
            console.log("db use");
            res.status(200).json(airportDb)
        }else{
            console.log("api use");
            let responseData = await getAirportData(queryCode)       
            res.status(200).json(responseData);
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

const getAllAirports = async (req: Request, res: Response) => {
    try {
        const rawAirportData: AirportAttributes[] = await Airport.findAll();
        const airportData = rawAirportData.map(el => {
            return {
                id: el.id,
                name: el.name,
                code: el.code,
                country: el.country,
                runways: el.runways.length,
                city: el.city
            }
        })
        res.status(200).json(airportData)
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

module.exports = { 
    getAirport,
    getAllAirports 
}