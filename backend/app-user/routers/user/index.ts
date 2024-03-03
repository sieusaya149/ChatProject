import express from 'express';
import { asyncHandler } from '@viethung/async-call';
import UserController from '../../controllers/user.controller';

const userRoute = express.Router();

userRoute.get(
    '/user/test',
    (req, res, next) => {
        res.json({ msg: "Hello Guys" });
    }
);

userRoute.post(
    '/user',
    asyncHandler(UserController.createNewUser)
);

userRoute.get(
    '/user/:userId',
    asyncHandler(UserController.getUserProfile)
);

userRoute.put(
    '/user/:userId',
    asyncHandler(UserController.updateUser)
);

userRoute.delete(
    '/user/:userId',
    asyncHandler(UserController.deleteUser)
);

userRoute.get(
    '/users',
    asyncHandler(UserController.getUserList)
);



export default userRoute;
