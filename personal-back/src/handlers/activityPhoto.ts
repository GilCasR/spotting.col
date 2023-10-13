import { Request, Response } from "express";
import { 
    createPhoto,
    updatePhoto
 } from "../controller/photoController";
import {
    Photo, 
    Aircraft,
    Airport
} from "../db"
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

export const getAllPhotos = async (req: Request, res: Response) => {
    try {
        const response = await Photo.findAll({
            include: [
                {
                model: Aircraft,
                attributes: ['id', 'registration', 'special_livery', 'type', 'aircraft_description']
                },
                {
                model: Airport,
                attributes: ['id', 'name', 'code']
                },
            ]
            });
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export const patchPhoto = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const {
            photo_date,
            views,
            likes,
            photo_description,
            link,
            like
        } = req.body
        const response = await updatePhoto(
            id,
            photo_date,
            photo_description,
            link, 
            like
        )
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export const getPhotoById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if(id){
            const photoById = await Photo.findByPk(id, {
                include: [
                    {
                    model: Aircraft,
                    attributes: ['id', 'registration', 'special_livery', 'type', 'aircraft_description']
                    },
                    {
                    model: Airport,
                    attributes: ['id', 'name', 'code']
                    },
                ]
                })
            if(photoById){
                photoById.views += 1;
                await photoById.save();
                res.status(200).json(photoById)
            }else{
                throw new Error(`photo with id ${id} not found`)
            }   
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}