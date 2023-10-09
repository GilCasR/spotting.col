import { Photo, Aircraft } from "../db"


export const createPhoto = async (
    id: string,
    photo_date: string, 
    photo_description: string, 
    aircraftid: string
    ) => {
    try {
        console.log(aircraftid);
        const aircraft = await Aircraft.findByPk(aircraftid);
        if (!aircraft) {
            console.log(`aircraft with id ${aircraftid} not found`);   
            return "bad request"
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
            }
            const newPhoto = await Photo.create(
                photoData
            )
            await (newPhoto as any).setAircraft(aircraft);
            return newPhoto
        }
       
    } catch (error) {
        return error
    }        
}