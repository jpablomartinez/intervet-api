import { DataTypes, Model } from 'sequelize';
import Service from '../../../../core/service/model';
import { sequelize } from '../db_instance';

class ServiceModel extends Model<Service> implements Service {
  public service_id?: string | undefined;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ServiceModel.init(
  {
    service_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV1
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'services',
    sequelize
  }
);

export default ServiceModel;
