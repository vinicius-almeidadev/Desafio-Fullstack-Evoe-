import { database } from '../config/database';
import { ColumnTypes } from '../config/columnTypes';

const User = database.define('User', {
    id: ColumnTypes.primary(),
    name: ColumnTypes.string(),
    email: ColumnTypes.string({ unique: true }),
    CPF: ColumnTypes.string({ unique: true }),
    birthday: ColumnTypes.date(),
    phone: ColumnTypes.string(),
});

module.exports = User;
