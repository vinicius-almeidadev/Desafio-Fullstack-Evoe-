import userModel from "../models/user-model.js";

export class UserController {
    static async createUser(req, res) {
        const { name, cpf, email, password, confirmPassword, adminRole, statePermission, municipalPermission, adminType, companyId } = req.body;
        try {
            const user = await userModel.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const user = await userModel.findByPk(req.params.id);
            if (user) {
                await user.update(req.body);
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await userModel.findByPk(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await userModel.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default UserController;
