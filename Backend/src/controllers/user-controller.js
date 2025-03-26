import userModel from "../models/user-model.js";
import UserHelper from "../helpers/users-helper.js";

export class UserController {
    static async createUser(req, res) {
        const { name, cpf, email, birthDate, phoneNumber,
            password, confirmPassword } = req.body;

        if (!name || !cpf || !email || !birthDate || !phoneNumber || !password)
            return res.status(400).json({ type: "error", message: "Todos os campos são obrigatórios" });

        if (password !== confirmPassword)
            return res.status(400).json({ type: "error", message: "As senhas não coincidem" });
        
        const hashedPassword = await UserHelper.encodePassword(password);

        const userBody = {
            name,
            cpf: cpf.replace(/\D/g, ""), // Remove all non-numeric characters
            email,
            birth_date: birthDate,
            phone_number: phoneNumber.replace(/\D/g, ""), // Remove all non-numeric characters
            password: hashedPassword,
        };

        const isUnique = await UserHelper.isUniqueRespected(res, userBody, userModel);
        if (!isUnique) return;

        try {
            const user = await userModel.create(userBody);
            const userResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                birthDate: user.birth_date,
                phoneNumber: user.phone_number,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
            res.status(201).json({ type: "success", message: "Usuário criado com sucesso", userResponse });
        } catch (error) {
            res.status(500).json({ type: "error", message: "Erro ao criar o usuário. Por favor, tente novamente mais tarde." });
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
