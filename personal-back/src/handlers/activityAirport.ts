import { Request, Response } from 'express';
import { Airport } from '../db';
import { getAirportData } from "../controller/airportControllers";

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

module.exports = { getAirport }