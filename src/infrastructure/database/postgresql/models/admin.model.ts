import { DataTypes, Model } from 'sequelize';
import Admin from '../../../../core/admin/model';
import { sequelize } from '../db_instance';

class AdminModel extends Model<Admin> implements Admin {
  public admin_id?: string | undefined;
  public name!: string;
  public lastname!: string;
  public rut!: string;
  public type!: string;
  public backup_email!: string;
  public phone!: string;
  public birthdate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AdminModel.init(
  {
    admin_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV1
    },    
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    rut: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'basic'
    },
    backup_email: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: ''
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: ''
    },
    birthdate: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  },
  {
    tableName: 'admins',
    sequelize
  }
);


export default AdminModel;
