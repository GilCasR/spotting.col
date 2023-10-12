import { Request, Response } from "express";
import { createPhoto } from "../controller/photoController";
import { v4 as uuidv4 } from "uuid"

export const postPhoto = async (req: Request, res: Response) => {
    try {
        const {
            photo_date,
            photo_description,
            aircraft_id,
            link,
            airport
        } = req.body
        const id = uuidv4()
        const response = await createPhoto(id, photo_date, photo_description, aircraft_id, link, airport)
        res.status(200).json(response)
    } catch (error: any) {
        res.status(400).json({ error: (error as Error).message });
    }
}
