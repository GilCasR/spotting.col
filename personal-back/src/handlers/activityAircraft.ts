import { Request, Response } from 'express';
import { AircraftType } from '../db';
import { v4 as uuidv4 } from "uuid"
import { getAircraftData, createAircraft } from "../controller/aircraftController"


const getAircraft = async (req: Request, res: Response) => {
    const manufacturer: string = req.params.manufacturer;
    const queryModel: string = req.params.model;
    try {
        const aircraftDb = await AircraftType.findOne({ 
            where: { model: queryModel.toUpperCase() } 
        });        
        if(aircraftDb){
            console.log("db use");
            res.status(200).json(aircraftDb)
        }else{
            console.log("api use");
            
            let responseData = await getAircraftData(manufacturer, queryModel)       
            res.status(200).json(responseData);
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

const postAircraft = async (req: Request, res: Response) => {
    try {
        const {
            registration,
            special_livery,
            type,
            aircraft_description,
        } = req.body
        const id = uuidv4()
        const responseData = await createAircraft(
                id,
                registration,
                special_livery,
                type,
                aircraft_description,
            )
        res.status(200).json(responseData);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

module.exports = { 
    getAircraft,
    postAircraft
}