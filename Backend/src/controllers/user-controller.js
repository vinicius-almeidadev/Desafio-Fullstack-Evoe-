import userModel from "../models/user-model.js";
import UserHelper from "../helpers/user-helper.js";

export class UserController {
    static async createUser(req, res) {
        const { password, confirmPassword } = req.body;

        const validation = UserHelper.validateUserData(req, res);
        if (!validation.valid) return UserHelper.handleResponse(res, 400, validation.message);

        if (password !== confirmPassword)
            return UserHelper.handleResponse(res, 400, "As senhas não coincidem");

        const userBody = UserHelper.formatUserData(req.body);
        userBody.password = await UserHelper.encodePassword(password);

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

            return UserHelper.handleResponse(res, 201, "Usuário criado com sucesso", userResponse);
        } catch (error) {
            console.error("Error creating user:", error);
            return UserHelper.handleResponse(res, 500, "Erro ao criar o usuário. Por favor, tente novamente mais tarde.");
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;

        const validation = UserHelper.validateUserData(req, res);
        if (!validation.valid) return UserHelper.handleResponse(res, 400, validation.message);

        const editedUser = UserHelper.formatUserData(req.body);
        const isUnique = await UserHelper.isUniqueRespected(res, editedUser, userModel);
        if (!isUnique) return;

        try {
            const user = await userModel.findByPk(id);
            if (!user) return UserHelper.handleResponse(res, 404, "Usuário não encontrado");

            await user.update(editedUser);

            const userResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                birthDate: user.birth_date,
                phoneNumber: user.phone_number,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

            return UserHelper.handleResponse(res, 200, "Usuário atualizado com sucesso", userResponse);
        } catch (error) {
            console.error("Error updating user:", error);
            return UserHelper.handleResponse(res, 400, "Erro ao atualizar o usuário. Por favor, tente novamente mais tarde.");
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;

        try {
            const user = await userModel.findByPk(id);
            if (!user) return UserHelper.handleResponse(res, 404, "Usuário não encontrado");

            const userResponse = {
                id: user.id,
                name: user.name,
                cpf: user.cpf,
                email: user.email,
                birthDate: user.birth_date,
                phoneNumber: user.phone_number,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

            return UserHelper.handleResponse(res, 200, "Dados do usuário recuperados com sucesso", userResponse);
        } catch (error) {
            console.error("Error fetching user", error);
            return UserHelper.handleResponse(res, 400, "Erro ao buscar os dados do usuário. Tente novamente mais tarde.");
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await userModel.findAll();
            if (!users || !users.length) return UserHelper.handleResponse(res, 200, "Nenhum usuário encontrado");
            const usersResponse = users.map(user => ({
                id: user.id,
                name: user.name,
                cpf: user.cpf,
                email: user.email,
                birthDate: user.birth_date,
                phoneNumber: user.phone_number,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }));

            return UserHelper.handleResponse(res, 200, "Usuários listados com sucesso", usersResponse, 'users');
        } catch (error) {
            console.error("Error fetching users", error);
            return UserHelper.handleResponse(res, 400, "Erro ao buscar a lista de usuários. Tente novamente mais tarde.");
        }
    }
}

export default UserController;
