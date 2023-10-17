const jwt = require('jsonwebtoken');
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { Request, Response, NextFunction, response } from "express";

const jwtAdminMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'No token provided' })
    }
    jwt.verify(token, config.JWT_SECRET, (err: JsonWebTokenError | null, decoded: JwtPayload | undefined) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
          }
      
          // Store the decoded token in the request object
          const user = decoded;
          if(user){
            const userRole = user.role
            if(userRole !== `admin`) return res.status(403).json({ message: 'please enter an admin account' });
          }
          next();
    })
};

module.exports = {
    jwtAdminMiddleware
}
