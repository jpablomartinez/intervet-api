import { DataTypes, Model, NOW } from 'sequelize';
import Animal from '../../../../core/animal/model';
import { sequelize } from '../db_instance';

class AnimalModel extends Model<Animal> implements Animal {
    public animal_id?: string | undefined;    
    public specie!: string;    
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}   

AnimalModel.init(
    {
        animal_id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1
        },
        specie: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        },
        
    },
    {
        tableName: 'animals',
        sequelize
    }
);

export default AnimalModel;