import { DataTypes, Model } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import IUser from '../../../../core/user/interface';
import { UserState } from '../../../../utils/user_state';
import { UserTypes } from '../../../../utils/user_types';
import { sequelize } from '../db_instance';

class UserModel extends Model<IUser> implements IUser {
  public id: string | undefined;
  public name!: string;
  public last_name!: string;
  public rut!: string;
  public email!: string;
  public phone!: string;
  public address!: Json;
  public user_type!: UserTypes;
  public user_state!: UserState;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV1
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
      defaultValue: ''
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
      defaultValue: DataTypes.STRING
    },
    rut: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.STRING,
      unique: true,
      defaultValue: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      defaultValue: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
      defaultValue: DataTypes.STRING
    },
    address: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.JSON,
      unique: false,
      defaultValue: DataTypes.STRING
    },
    user_type: {
      allowNull: false,
      type: DataTypes.ENUM({
        values: ['PetOwner', 'Veterinary', 'Admin']
      })
    },
    user_state: {
      allowNull: false,
      type: DataTypes.ENUM({
        values: ['ToValidate', 'Active', 'Suspended', 'Deleted']
      })
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'users',
    sequelize
  }
);

export default UserModel;
