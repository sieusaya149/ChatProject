import express from 'express';
import {asyncHandler} from '@viethung/async-call';
import UserController from '../../controllers/user.controller';
const userRoute = express.Router();
userRoute.get(
    '/user/test',
    (req, res, next) => {
        res.json({msg: "Hello Guys"})
    }
);

userRoute.get(
    '/user/:userId',
    asyncHandler(UserController.getUserProfile)
);

export default userRoute;
