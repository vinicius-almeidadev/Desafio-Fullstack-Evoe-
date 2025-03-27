import bcrypt from "bcrypt";
import RegexHelper from "./regex-helper.js";
import { Op } from "sequelize";
const saltRounds = 15; // Define the number of salt rounds

export class UserHelper {
    static validateUserData(req) {
        const { name, cpf, email, birthDate, phoneNumber } = req.body;

        if (!name || !cpf || !email || !birthDate || !phoneNumber)
            return { valid: false, message: "Todos os campos são obrigatórios" };

        if (!RegexHelper.cpf.test(cpf))
            return { valid: false, message: "CPF inválido" };

        if (!RegexHelper.email.test(email))
            return { valid: false, message: "E-mail inválido" };

        if (!RegexHelper.birthDate.test(birthDate))
            return { valid: false, message: "Data de nascimento inválida" };

        if (!RegexHelper.phoneNumber.test(phoneNumber))
            return { valid: false, message: "Número de telefone inválido" };

        return { valid: true };
    }

    static async handleResponse(res, status, message, data = null, dataKey = 'user') {
        const responseData = data ? { [dataKey]: data } : {};
        res.status(status).json({ type: status >= 400 ? "error" : "success", message, ...responseData });
    }

    static formatUserData(body) {
        return {
            name: body.name,
            cpf: body.cpf.replace(/\D/g, ""), // Remove all non-numeric characters
            email: body.email,
            birth_date: body.birthDate,
            phone_number: body.phoneNumber.replace(/\D/g, ""), // Remove all non-numeric characters
        };
    }

    static async encodePassword(password) {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    }

    static listUniqueFields(model) {
        const uniqueFields = [];
        const attributes = model.rawAttributes;

        for (const key in attributes)
            if (attributes[key].unique)
                uniqueFields.push(key);

        return uniqueFields;
    }

    static async isUniqueRespected(res, body, model, currentId = null) {
        const uniqueFields = UserHelper.listUniqueFields(model);
        const duplicateKeys = [];

        for (const key of uniqueFields) {
            const filter = {};

            if (!body[key]) continue;

            filter[key] = body[key];
            if (currentId) filter.id   = { [Op.ne]: body.id };

            const duplicate = await model.findOne({ where: filter });
            if (duplicate === false) return false;
            if (duplicate) duplicateKeys.push(key);
        }

        if (duplicateKeys.length == 0) return true;

        const translatedKeys = duplicateKeys.map(key => {
            switch (key) {
                case "email": return "E-mail";
                case "cpf": return "CPF";
                default: return key;
            }
        });

        res.status(400).json({ 
            toastType: "error", 
            message: `Os valores fornecidos para os seguintes campos já estão em uso: ${translatedKeys.join(", ")}` 
        });

        return false;
    }
}

export default UserHelper;