import express from "express";
import UserController from "../controllers/user-controller.js";

const router = express.Router();

router.post(
    '/',
    UserController.createUser
);

router.put(
    '/:id',
    UserController.updateUser
);

router.get(
    '/:id',
    UserController.getUserById
);

router.get(
    '/',
    UserController.getUsers
);

export default router;
