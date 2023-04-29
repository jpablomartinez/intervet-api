import { DataTypes, Model } from 'sequelize'; 
import CreditCard from '../../../../core/credit_card/model';
import { sequelize } from '../db_instance';

class CreditCardModel extends Model<CreditCard> implements CreditCard {
    public credit_card_id?: string;
    public user_id?: string;
    public number!: string;
    public expiration_date!: string;
    public code!: string;
    public propietary_name!: string;
    public other_name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

CreditCardModel.init(
    {
        credit_card_id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: DataTypes.UUID,
            unique: true,
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
        number: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            defaultValue: ''
        },
        expiration_date: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        },
        code: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        },
        propietary_name: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        },        
        other_name: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        }
    },
    {
        tableName: 'credit_cards',
        sequelize
    }
);

export default CreditCardModel;