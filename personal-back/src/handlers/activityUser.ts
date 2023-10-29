import { Request, Response } from "express";
import { User } from "../db"
import { v4 as uuidv4 } from "uuid"
import {
    createAdmin,
    userLogin
} from "../controller/userController"

export const postAdmin = async (req: Request, res: Response) => {
    try {
        const {
            user_name,
            user_password,
            user_email,
            user_image
        } = req.body
        const id = uuidv4()

        const adminCheck = await User.findOne({
            where: {
              role: 'admin'
            }
          });
        if(adminCheck){
            res.status(401).json("admin already created")
        }else{
            const response = await createAdmin(
                id,
                user_name,
                user_password,
                user_email,
                user_image,
            )
            res.status(201).json(response)
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }

}

export const getUserLogin = async (req: Request, res: Response) => {
    try {       
        const {
            email,
            password 
        } = req.body
        const loginValidation = await userLogin(email, password)
        console.log(loginValidation);
        
        if(loginValidation === null){
            res.status(404).json(`user with email ${email} not found`)
        }else if(loginValidation === false){
            res.status(401).json("incorrect password")
        }else{
            res.status(200).json(loginValidation)
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}