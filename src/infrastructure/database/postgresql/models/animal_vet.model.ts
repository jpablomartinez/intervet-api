import { DataTypes, Model } from 'sequelize';
import AnimalVet from '../../../../core/animal_vet/model';
import { sequelize } from '../db_instance';

class AnimalVetModel extends Model<AnimalVet> implements AnimalVet {
    public animal_id?: string | undefined;
    public vet_id?: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
}

AnimalVetModel.init(
    {
        animal_id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,            
            type: DataTypes.UUID,            
        },
        vet_id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,            
            type: DataTypes.UUID,            
        },
    }, 
    {
        tableName: 'animal_vet',
        sequelize
    }
);

export default AnimalVetModel;