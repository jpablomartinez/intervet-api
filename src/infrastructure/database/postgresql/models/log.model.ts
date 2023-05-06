import { DataTypes, Model } from 'sequelize';
import Log from '../../../../core/log/model';
import { sequelize } from '../db_instance';

class LogModel extends Model<Log> implements Log {
    public log_id?: string | undefined;
    public auth_id?: string | undefined;
    public reason!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

LogModel.init(
    {
        log_id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1
        },
        auth_id: {
            allowNull: false,                                    
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            references: {
                model: 'auth',
                key: 'auth_id'
            },
            onDelete: 'cascade'
        },
        reason: {
            allowNull: false,
            type: DataTypes.TEXT,
            defaultValue: ''
        },
    },
    {
        tableName: 'logs',
        sequelize
    }
);

export default LogModel;