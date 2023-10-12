import { Photo, Aircraft, Airport } from "../db"


export const createPhoto = async (
    id: string,
    photo_date: string, 
    photo_description: string, 
    aircraftid: string,
    link: string,
    airportid: string
    ) => {
    try {
        console.log(aircraftid);
        const aircraft = await Aircraft.findByPk(aircraftid);
        const airport = await Airport.findByPk(airportid)
        if(!airport){
            console.log(`airport with id ${airportid} not found`);   
            return `bad request airport with id ${airportid} not found`
        } else if (!aircraft) {
            console.log(`aircraft with id ${aircraftid} not found`);   
            return `bad request, aircraft with id ${aircraftid} not found`
        }else{
            console.log("found ");
            const date = new Date()
            const zero = 0
            const photoData = {
                id: id,
                photo_date: date,
                views: zero,
                likes: zero,
                photo_description: photo_description,
                aircraft_id: aircraftid,
                link: link
            }
            const newPhoto = await Photo.create(
                photoData
            )
            await (newPhoto as any).setAircraft(aircraft);
            await (newPhoto as any).setAirport(airport)
            return newPhoto
        }
       
    } catch (error) {
        return error
    }        
}