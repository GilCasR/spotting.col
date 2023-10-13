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

interface UpdateAttributtes {
    name: string | undefined;
    foundation: number | undefined;
    skyTrax_rating: number | undefined;
    iata_code: string | undefined;
    main_office: string | undefined;
    country: string | undefined;
    country_code: string | undefined;
    logo: string | undefined;
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

export const updateAirline = async (
    id: string,
    name: string | null,
    foundation: number | null,
    skyTrax_rating: number | null,
    iata_code: string | null,
    main_office: string | null,
    country: string | null,
    country_code: string | null,
    logo: string | null,
    airports: string[] | null
) => {
    try {

        const updateFields: UpdateAttributtes = {
            name: undefined,
            foundation: undefined,
            skyTrax_rating: undefined,
            iata_code: undefined,
            main_office: undefined,
            country: undefined,
            country_code: undefined,
            logo: undefined,
        };

        const airline = await Airline.findByPk(id)
        if (!airline) {
            throw new Error(`airline with id ${id} not found`)
        }
        if (name) {
            const airlineByName = await Airline.findOne({
              where: { name: name}
            });
            if (airlineByName) return 'nombre en uso';
            updateFields.name = name;
        };
        if (foundation) updateFields.foundation = foundation
        if (skyTrax_rating) updateFields.skyTrax_rating = skyTrax_rating;
        if (iata_code) updateFields.iata_code = iata_code;
        if (main_office) updateFields.main_office = main_office;
        if (country) updateFields.country = country;
        if (country_code) updateFields.country_code = country_code;
        if (logo) updateFields.logo = logo;

        await airline.update(updateFields)
        return airline
    } catch (error) {
        
    }
}