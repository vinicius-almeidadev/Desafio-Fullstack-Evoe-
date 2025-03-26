import express from "express";
import UserController from "../controllers/user-controller.js";

const router = express.Router();

router.post(
    '/users',
    UserController.createUser
);

router.put(
    '/users/:id',
    UserController.updateUser
);

router.get(
    '/users/:id',
    UserController.getUserById
);

router.get(
    '/users',
    UserController.getUsers
);

export default router;
