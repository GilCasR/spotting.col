import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';
import config from '../../config';
import { AirportData, AirportInfo, Runways } from "./airport.interface"
import { Airport } from '../db';
import { v4 as uuidv4 } from "uuid"

export const getAirportData = async (code: string) => {
    try {
        const url: string = `https://airportdb.io/api/v1/airport/${code}?apiToken=${config.API_KEY}`        
        const response: AxiosResponse<AirportData> = await axios.get(url)
        const apiCode: string = response.data.ident
        const apiName: string = response.data.name
        const apiElevation: number = response.data.elevation_ft
        const apiLatitud: number = response.data.latitude_deg
        const apiLongitude: number = response.data.longitude_deg
        const apiCountry: string = response.data.country.name
        const apiCountryCode: string = response.data.country.code
        const apiRegion: string = response.data.region.name
        const apiCity: string = response.data.municipality
        const apiRunways: Runways[] = response.data.runways.map(el => {
            return {
                length_ft: parseInt(el.length_ft),
                length_m: parseInt(el.length_ft) * 0.3048, // Convert feet to meters
                nameA: el.le_ident,
                nameB: el.he_ident,
            };
        })        
        
        const airportInfo: AirportInfo = {
            id: uuidv4(),
            name: apiName,
            code: apiCode,
            elevation: apiElevation,
            latitud: apiLatitud,
            longitude: apiLongitude,
            country: apiCountry,
            countryCode: apiCountryCode,
            runways: apiRunways,
            region: apiRegion,
            city: apiCity
        };
        
        const newAirport = await Airport.create(airportInfo)

        return newAirport;
    } catch (error: any) {
        return error.message
    }
}
