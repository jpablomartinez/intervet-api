import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db_instance';
import Comment from '../../../../core/comment/model';
import { moveSyntheticComments } from 'typescript';
import UserModel from './user.model';
import VeterinaryModel from './veterinary.model';

class CommentModel extends Model<Comment> implements Comment {
    public comment_id?: string | undefined;
    public user_id?: string | undefined;
    public vet_id?: string | undefined;
    public comment!: string;
    public rating!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CommentModel.init(
    {
        comment_id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            unique: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1
        },
        user_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        vet_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            references: {
                model: 'vets',
                key: 'vet_id'
            }
        },
        comment: {
            allowNull: false,
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        rating: {
            allowNull: false,
            type: DataTypes.FLOAT,
            defaultValue: 1
        },

    },
    {
        tableName: 'comments',
        sequelize
    }
);

UserModel.hasMany(CommentModel, {foreignKey: 'user_id'});
CommentModel.belongsTo(UserModel, {foreignKey: 'user_id'});

VeterinaryModel.hasMany(CommentModel, {foreignKey: 'vet_id'});
CommentModel.belongsTo(VeterinaryModel, {foreignKey: 'vet_id'});

export default CommentModel;
