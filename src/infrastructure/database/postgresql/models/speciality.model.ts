import { DataTypes, Model } from 'sequelize';
import Speciality from '../../../../core/speciality/model';
import { sequelize } from '../db_instance';

class SpecialityModel extends Model<Speciality> implements Speciality{
    public speciality_id?: string | undefined;
    public name!: string;
    public description!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

SpecialityModel.init(
    {
        speciality_id: {
            type: DataTypes.UUID,
            unique: true,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
            defaultValue: DataTypes.UUIDV1
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'specialties',
        sequelize
    }
);

export default SpecialityModel;