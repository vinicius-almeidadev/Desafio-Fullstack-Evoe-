import { DataTypes } from 'sequelize';

class ColumnTypes {
    // Define the primary key with UUID
    static primary() {
        return {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        };
    }

    // Define a generic field with type and extra (customizable)
    static field(dataType, extra = {}) {
        return {
            type: dataType,
            allowNull: false,
            ...extra,  // Can override allowNull and other options
        };
    }

    // Methods for specific types
    static boolean(extra = {}) { return this.field(DataTypes.BOOLEAN, extra); }
    static string(extra = {}) { return this.field(DataTypes.STRING, extra); }
    static enum(values, extra = {}) { return this.field(DataTypes.ENUM(...values), extra); }
    static datetime(extra = {}) { return this.field(DataTypes.DATE, extra); }
    static date(extra = {}) { return this.field(DataTypes.DATEONLY, extra); }

    // Enum (in case a field with fixed value is needed)
    static enum(values, extra) {
        return this.field(DataTypes.ENUM(values), extra);
    }
}

export default ColumnTypes;
