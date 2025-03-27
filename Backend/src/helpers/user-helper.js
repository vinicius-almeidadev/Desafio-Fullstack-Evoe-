import bcrypt from "bcrypt";
const saltRounds = 15; // Define the number of salt rounds

export class UserHelper {
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