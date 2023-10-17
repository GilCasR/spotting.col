import { User } from "../db";
import { hashSync, compareSync } from "bcrypt";
import config from '../../config';
const jwt = require('jsonwebtoken');

export const createAdmin = async (
        id_: string,
        name: string,
        password: string,
        email: string,
        image: string,
    ) =>{
    try {
        const hashPassword =  hashSync(password, 8);
        const adminData = {
            id: id_,
            user_name: name,
            user_password: hashPassword,
            user_email: email,
            user_image: image,
            role: 'admin',
            is_active: true
        }
        console.log(adminData);
        
        const newAdmin = await User.create(adminData)
        return newAdmin
    } catch (error) {
        return error
    }
};

const generateToken = (user: User) => {
    const payload = {
        id: user.id,
        userEmail: user.user_email,
        role: user.role
    }
    const options = {
        expiresIn: '4h'
    }

    const token = jwt.sign(payload, config.JWT_SECRET, options);
    return token;
} 

export const userLogin = async (email: string, password: string) => {
    try {
        const user = await User.findOne({
            where: {
                user_email: email,
                is_active: true
            }
        })
        if(!user) return null
        const passwordMatch = await compareSync(password, user.user_password)
        if(passwordMatch){
            const token = generateToken(user)
            return { user, token }
        }else{
            return false
        }
    } catch (error) {
        return error
    }       
}