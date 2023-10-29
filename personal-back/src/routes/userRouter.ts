import { Router } from "express";
const {
    postAdmin,
    getUserLogin
} = require("../handlers/activityUser")

const userRouter = Router();

userRouter.post("/createAdmin", postAdmin);
userRouter.post("/login", getUserLogin);

export default userRouter