import axios from 'axios';
import config from '../../config';
import { AxiosResponse, AxiosError } from 'axios';
import { AircraftTypeData, AircraftTypeAttributes } from './aircraftType.interface';
import { AircraftType } from '../db';
import { v4 as uuidv4 } from "uuid"

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
