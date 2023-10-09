import axios from 'axios';
import config from '../../config';
import { AxiosResponse, AxiosError } from 'axios';
import { AircraftTypeData, AircraftTypeAttributes, AircraftAttributes } from './aircraftType.interface';
import { AircraftType } from '../db';
import { Aircraft } from '../db';
import { v4 as uuidv4 } from "uuid";

export const getAircraftData = async (manufacturer: string, model: string) => {
    try {             
        const response: AxiosResponse<AircraftTypeData[]> = await axios.get(
            `https://api.api-ninjas.com/v1/aircraft?manufacturer=${manufacturer}&model=${model}`,
            {headers: {
                'X-Api-Key': config.AIRCRAFT_API_KEY
              }}
        )
        
        const responseData = response.data[0]
              
        const apiModel = responseData.model
        const apiManufacturer = responseData.manufacturer
        const max_speed_api = Number(responseData.max_speed_knots)
        const ceiling_api = Number(responseData.ceiling_ft)
        const weight_api = Number(responseData.gross_weight_lbs)
        const length_api = Number(responseData.length_ft)
        const height_api = Number(responseData.height_ft)
        const wing_api = Number(responseData.wing_span_ft)
        const range_api = Number(responseData.range_nautical_miles) 
        
        
        const aircraftInfo: AircraftTypeAttributes = {
            id: uuidv4(),
            model: apiModel,
            manufacturer: apiManufacturer,
            max_speed_knots: max_speed_api,
            ceiling_ft: ceiling_api,
            gross_weight_lbs: weight_api,
            length_ft: length_api,
            height_ft: height_api,
            wing_span_ft: wing_api,
            range_nautical_miles: range_api
        };
        
        const newAircraft = await AircraftType.create(aircraftInfo)
        
        return newAircraft;
    } catch (error: any) {
        return error.message
    }
}


export const createAircraft =async (
        id_: string,
        registration_: string,
        special_livery_: string,
        type_: string,
        aircraft_description_: string,
        aircraft_type: string
    ) => {
        try {
            let boolean: boolean
            if (special_livery_ === "true") {
                boolean = true;
            } else if (special_livery_ === "false") {
                boolean = false;
            } else {
                // Handle other cases here (e.g., set a default value or throw an error)
                boolean = false; // Setting a default value (false in this case)
            }
            const aircraftData: AircraftAttributes = {
                id: id_,
                registration: registration_,
                special_livery: boolean,
                type: type_,
                aircraft_description: aircraft_description_,
            };
            const aircraftType = await AircraftType.findByPk(aircraft_type)
            const newAircraft: Aircraft = await Aircraft.create(aircraftData);
            if (aircraftType) {
                console.log("found");
                await (newAircraft as any).setAircraftType(aircraftType);
            }         
            return newAircraft
        } catch (error: any) {
            return error.message
        }
}

export const createAircraftType = async (
        id: string,
        model: string,
        manufacturer: string,
        max_speed_knots: number,
        ceiling_ft: number,
        gross_weight_lbs: number,
        length_ft: number, 
        height_ft: number,
        wing_span_ft: number,
        range_nautical_miles: number,
    ) => {
        try {
            const aircraftTypeData: AircraftTypeAttributes = {
                id,
                model,
                manufacturer,
                max_speed_knots,
                ceiling_ft,
                gross_weight_lbs,
                length_ft, 
                height_ft,
                wing_span_ft,
                range_nautical_miles
            }
            const newAircraftType: AircraftType = await AircraftType.create(aircraftTypeData)
            return newAircraftType
        } catch (error: any) {
            return error.message
        }
}