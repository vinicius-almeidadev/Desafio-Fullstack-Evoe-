import database from '../config/database.js';
import columnTypes from '../config/column-types.js';

const UserModel = database.define('User', {
    id: columnTypes.primary(),
    name: columnTypes.string(),
    email: columnTypes.string({ unique: true }),
    cpf: columnTypes.string({ unique: true }),
    birth_date: columnTypes.date(),
    phone_number: columnTypes.string(),
    password: columnTypes.string(),
});

export default UserModel;
