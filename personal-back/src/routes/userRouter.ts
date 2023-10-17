import { Router } from "express";
const {
    postAdmin,
    getUserLogin
} = require("../handlers/activityUser")

const userRouter = Router();

userRouter.post("/createAdmin", postAdmin);
userRouter.get("/login", getUserLogin);

export default userRouter