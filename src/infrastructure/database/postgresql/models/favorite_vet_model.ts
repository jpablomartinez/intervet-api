import { DataTypes, Model } from 'sequelize';
import FavoriteVet from '../../../../core/favorite_vet/model';
import { sequelize } from '../db_instance';
import UserModel from './user.model';
import VeterinaryModel from './veterinary.model';

class FavoriteVetModel extends Model<FavoriteVet> implements FavoriteVet {
    public user_id?: string | undefined;
    public vet_id?: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

FavoriteVetModel.init(
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: UserModel,
                key: 'user_id'
            },
            onDelete: 'cascade'
        },
        vet_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: VeterinaryModel,
                key: 'vet_id'
            },
            onDelete: 'cascade'
        },
    },
    {
        tableName: 'FavoriteVet',
        sequelize
    }
);

export default FavoriteVetModel;