import { DataTypes, Model } from 'sequelize';
import VetService from '../../../../core/vet_service/model';
import { sequelize } from '../db_instance';

class VetServiceModel extends Model<VetService> implements VetService {
  public vet_service_id?: string | undefined;
  public vet_id?: string | undefined;
  public name_service!: string;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

VetServiceModel.init(
  {
    vet_service_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV1
    },
    vet_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'vets',
        key: 'vet_id'
      },
      onDelete: 'cascade'
    },
    name_service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    tableName: 'vet_services',
    sequelize
  }
);

export default VetServiceModel;
