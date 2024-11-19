import { DataTypes, Model, Sequelize } from 'sequelize';
import { AstronautAttributes } from '../types/astronautTypes';

export class Astronaut extends Model<AstronautAttributes> implements AstronautAttributes {
    public id?: number;
    public name!: string;
    public role!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initAstronautModel = (sequelize: Sequelize): typeof Astronaut => {
    Astronaut.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'Astronaut',
            timestamps: true,
        }
    );

    return Astronaut;
};
