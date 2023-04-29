import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db_instance';
import BankAccount from '../../../../core/bank_account/model';

class BankAccountModel extends Model<BankAccount> implements BankAccount {
    public bank_account_id?: string | undefined;
    public user_id?: string | undefined;
    public account_type!: string;
    public account_number!: string;
    public bank!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;    
}

BankAccountModel.init(
    {
        bank_account_id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            unique: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1
        },
        user_id: {
            allowNull: false,                        
            unique: true,
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'user_id'
            },
            onDelete: 'cascade'
        },
        account_type: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        },
        account_number: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        },
        bank: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: ''
        }
    },
    {
        tableName: 'bank_accounts',
        sequelize
    }
);

export default BankAccountModel;