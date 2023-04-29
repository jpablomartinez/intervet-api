import { DataTypes, Model } from 'sequelize';
import Pet from '../../../../core/pet/model';
import { sequelize } from '../db_instance';

class PetModel extends Model<Pet> implements Pet {
    public pet_id?: string | undefined;
    public user_id?: string | undefined;
    public name!: string;
    public specie!: string;
    public breed!: string;
    public birthdate!: Date;
    public chip_number!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

PetModel.init(
    {
        pet_id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1
        },
        user_id: {
            allowNull: false,                                    
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'user_id'
            },
            onDelete: 'cascade'
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        },
        specie: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        },
        breed: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 'half-breed'
        },
        birthdate: {
            allowNull: false,
            type: DataTypes.DATE,            
        },
        chip_number: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        }
    },
    {
        tableName: 'pets',
        sequelize
    }
);

export default PetModel;