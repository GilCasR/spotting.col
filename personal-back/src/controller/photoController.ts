import { Photo, Aircraft, Airport } from "../db"

interface UpdateAttributtes {
    photo_date: Date | undefined,
    views: undefined,
    likes: undefined,
    photo_description: string | undefined,
    link: string | undefined
}

export const createPhoto = async (
    id: string,
    photo_date: Date, 
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
                photo_date: photo_date,
                views: zero,
                likes: zero,
                photo_description: photo_description,
                aircraft_id: aircraftid,
                link: link
            }
            const newPhoto = await Photo.create(photoData);
            await (newPhoto as any).setAircraft(aircraft);
            await (newPhoto as any).setAirport(airport);
            return newPhoto;
        }
       
    } catch (error) {
        return error
    }        
}

export const updatePhoto =async (
        id: string,
        photo_date: Date | null,
        photo_description: string | null,
        link: string | null,
        like: boolean | null
    ) => {
    
        try {
            const photo = await Photo.findByPk(id)
            if(!photo) throw new Error(`photo with id ${id} not found`)
    
            const updateFields: UpdateAttributtes = {
                photo_date: undefined,
                views: undefined,
                likes: undefined,
                photo_description: undefined,
                link: undefined
            }
    
            if(photo_date) updateFields.photo_date = photo_date
            if(photo_description) updateFields.photo_description = photo_description
            if(link) updateFields.link = link

            if(like){
                photo.likes += 1;
                await photo.save()
            }
    
            await photo.update(updateFields)
            return photo
        } catch (error: any) {
            return error.message
        }
}