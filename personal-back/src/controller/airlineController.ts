import { 
    Airline 
} from "../db";

interface AirlineAttributtes {
    id: string;
    name: string;
    foundation: number;
    skyTrax_rating: number;
    iata_code: string;
    main_office: string;
    country: string;
    country_code: string;
    logo: string;
}

export const createAirline = async (
        id: string,
        name: string,
        foundation: number,
        skyTrax_rating: number,
        iata_code: string,
        main_office: string,
        country: string,
        country_code: string,
        logo: string,
        airports: string[]
    ) => {
        try {
            const airlineData: AirlineAttributtes = {
                id,
                name,
                foundation,
                skyTrax_rating,
                iata_code,
                main_office,
                country,
                country_code,
                logo,
            }
            const newAirline = await Airline.create(airlineData)
            return newAirline
        } catch (error: any) {
            return error.message
        }
}